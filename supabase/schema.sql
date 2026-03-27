-- IFA・保険代理店テーブル
create table advisors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null check (type in ('ifa', 'insurance', 'both')),
  description text,
  address text,
  prefecture text,
  website_url text,
  specialties text[], -- 専門分野タグ（例: 老後資金, 教育費, 保険見直し）
  avg_rating numeric(3,2) default 0,
  review_count integer default 0,
  created_at timestamptz default now()
);

-- レビューテーブル
create table reviews (
  id uuid default gen_random_uuid() primary key,
  advisor_id uuid references advisors(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  -- 項目別評価（1〜5）
  rating_overall integer not null check (rating_overall between 1 and 5),
  rating_proposal integer not null check (rating_proposal between 1 and 5),     -- 提案の質
  rating_fee_transparency integer not null check (rating_fee_transparency between 1 and 5), -- 手数料の透明性
  rating_communication integer not null check (rating_communication between 1 and 5),       -- コミュニケーション
  rating_expertise integer not null check (rating_expertise between 1 and 5),               -- 専門知識
  -- タグ（複数選択）
  tags text[],  -- 例: 親切, 説明が丁寧, レスポンスが早い, 手数料が明確
  -- 任意コメント（200字以内）
  comment text check (char_length(comment) <= 200),
  -- 利用した商品カテゴリ
  service_used text check (service_used in ('investment_trust', 'stocks', 'insurance', 'idc', 'nisa', 'other')),
  created_at timestamptz default now(),
  -- 1ユーザー1アドバイザーにつき1レビューのみ
  unique(advisor_id, user_id)
);

-- プロフィールテーブル（auth.usersの拡張）
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nickname text,
  created_at timestamptz default now()
);

-- アドバイザーの平均評価を自動更新するトリガー
create or replace function update_advisor_rating()
returns trigger as $$
begin
  update advisors
  set
    avg_rating = (
      select round(avg(rating_overall)::numeric, 2)
      from reviews
      where advisor_id = coalesce(new.advisor_id, old.advisor_id)
    ),
    review_count = (
      select count(*)
      from reviews
      where advisor_id = coalesce(new.advisor_id, old.advisor_id)
    )
  where id = coalesce(new.advisor_id, old.advisor_id);
  return new;
end;
$$ language plpgsql;

create trigger on_review_change
after insert or update or delete on reviews
for each row execute function update_advisor_rating();

-- RLS（Row Level Security）ポリシー
alter table advisors enable row level security;
alter table reviews enable row level security;
alter table profiles enable row level security;

-- advisors: 誰でも閲覧可、運営のみ編集可
create policy "advisors_read" on advisors for select using (true);

-- reviews: 誰でも閲覧可、ログインユーザーのみ投稿可、自分のレビューのみ編集/削除可
create policy "reviews_read" on reviews for select using (true);
create policy "reviews_insert" on reviews for insert with check (auth.uid() = user_id);
create policy "reviews_update" on reviews for update using (auth.uid() = user_id);
create policy "reviews_delete" on reviews for delete using (auth.uid() = user_id);

-- profiles: 自分のプロフィールのみ読み書き可
create policy "profiles_read" on profiles for select using (auth.uid() = id);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- 新規ユーザー登録時に自動的にprofileを作成
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_user();

-- advisors に meeting_method カラムを追加
alter table advisors add column if not exists meeting_method text
  check (meeting_method in ('in_person', 'online', 'both'));

-- 参考になった（いいね）テーブル
create table if not exists review_likes (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(review_id, user_id)
);

alter table review_likes enable row level security;
create policy "review_likes_read"   on review_likes for select using (true);
create policy "review_likes_insert" on review_likes for insert with check (auth.uid() = user_id);
create policy "review_likes_delete" on review_likes for delete using (auth.uid() = user_id);

-- 通報テーブル
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references reviews(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  reason text not null,
  created_at timestamptz default now(),
  unique(review_id, user_id)
);

alter table reports enable row level security;
-- 通報は誰でも投稿可（自分の通報のみ）
create policy "reports_insert" on reports for insert with check (auth.uid() = user_id);
-- 通報の閲覧は運営のみ（service_role キーで確認）

-- サンプルデータ
insert into advisors (name, type, description, prefecture, specialties) values
('サンプルIFA東京', 'ifa', 'NISA・投資信託の相談を中心に、個人の資産形成をサポートします。', '東京都', array['NISA', '資産形成', '投資信託']),
('サンプル保険代理店大阪', 'insurance', '生命保険・医療保険の見直しを専門に取り扱っています。', '大阪府', array['生命保険', '医療保険', '保険見直し']),
('フィナンシャルプランニング名古屋', 'both', 'IFAと保険代理店の両機能を持つ総合的なFP事務所です。', '愛知県', array['老後資金', '教育費', '保険', '資産運用']);
