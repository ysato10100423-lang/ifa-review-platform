#!/usr/bin/env python3
"""
既存のadvisorsデータを拡充するスクリプト:
1. 生命保険協会の認定代理店データを追加
2. 主要IFA・保険代理店のWebサイトURLを補完
"""

import json
import os
import requests
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SERVICE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# 生命保険協会認定の保険代理店データ
INSURANCE_AGENCIES = [
    {
        "name": "株式会社ダーウィン",
        "type": "insurance",
        "description": "生命保険協会認定代理店。ほけんの窓口フランチャイズ加盟店を運営。",
        "prefecture": "東京都",
        "specialties": ["生命保険", "医療保険", "保険見直し"]
    },
    {
        "name": "株式会社ともにあーる",
        "type": "insurance",
        "description": "生命保険協会認定代理店。ほけんの窓口フランチャイズ加盟店を運営。",
        "prefecture": None,
        "specialties": ["生命保険", "医療保険", "保険見直し"]
    },
    {
        "name": "株式会社ライフプラザNEO",
        "type": "insurance",
        "description": "生命保険協会認定代理店。ほけんの窓口フランチャイズ加盟店を運営。",
        "prefecture": None,
        "specialties": ["生命保険", "医療保険", "保険見直し"]
    },
    {
        "name": "株式会社ETERNAL",
        "type": "insurance",
        "description": "生命保険協会認定代理店。「保険テラス」ブランドで来店型保険ショップを全国展開。",
        "prefecture": "兵庫県",
        "website_url": "https://hoken-eshop.com/",
        "specialties": ["生命保険", "医療保険", "保険見直し", "来店型"]
    },
    {
        "name": "株式会社ライフサロン",
        "type": "insurance",
        "description": "生命保険協会認定代理店。「ほけんの相談ショップ」ブランドで来店型保険ショップを運営。",
        "prefecture": "東京都",
        "website_url": "https://www.lifesalon.co.jp/",
        "specialties": ["生命保険", "医療保険", "保険見直し", "来店型"]
    },
    {
        "name": "株式会社アイリックコーポレーション",
        "type": "insurance",
        "description": "生命保険協会認定代理店。「保険クリニック」ブランドの直営店を運営。東証スタンダード上場。",
        "prefecture": "東京都",
        "website_url": "https://www.irrc.co.jp/",
        "specialties": ["生命保険", "医療保険", "保険比較", "保険見直し", "来店型"]
    },
    {
        "name": "株式会社FPパートナー",
        "type": "both",
        "description": "「マネードクター」ブランドでFPによる保険・資産運用相談サービスを全国展開。東証プライム上場。",
        "prefecture": "東京都",
        "address": "東京都文京区後楽1-5-3 後楽国際ビルディング5F",
        "website_url": "https://fp-moneydoctor.com/",
        "specialties": ["生命保険", "資産運用", "住宅ローン", "家計相談", "訪問型"]
    },
    {
        "name": "株式会社ティ・アイ・エス",
        "type": "insurance",
        "description": "生命保険協会認定代理店。ほけんの窓口フランチャイズ加盟店を運営。",
        "prefecture": None,
        "specialties": ["生命保険", "医療保険", "保険見直し"]
    },
    {
        "name": "株式会社ライフクリエイト",
        "type": "insurance",
        "description": "生命保険協会認定代理店。ほけんの窓口フランチャイズ加盟店を運営。",
        "prefecture": None,
        "specialties": ["生命保険", "医療保険", "保険見直し"]
    },
]

# 既知のWebサイトURL（名前の部分一致で適用）
KNOWN_URLS = {
    "ファイナンシャルスタンダード": "https://www.financial-standard.co.jp/",
    "SBIマネープラザ": "https://www.sbimoneyplaza.co.jp/",
    "Japan Asset Management": "https://www.japan-asset-management.com/",
    "ほけんの窓口グループ": "https://www.hokennomadoguchi.com/",
    "保険見直し本舗": "https://www.hokepon.com/",
    "保険クリニック": "https://www.hoken-clinic.com/",
    "保険市場": "https://www.hokende.com/",
    "アドバンスクリエイト": "https://www.hokende.com/",
    "エージェント・インシュアランス": "https://agent-insurance.com/",
    "Fan": "https://fan-group.jp/",
    "アンバー・アセット": "https://www.amberasset.co.jp/",
    "IFA法人GAIA": "https://www.gaiainc.jp/",
    "CSアセット": "https://cs-asset.co.jp/",
    "ブロードマインド": "https://www.broadmind.co.jp/",
}


def add_insurance_agencies():
    """保険代理店データを追加"""
    # 既存チェック
    r = requests.get(f"{SUPABASE_URL}/rest/v1/advisors?select=name", headers=HEADERS)
    existing_names = {a['name'] for a in r.json()}

    new_agencies = [a for a in INSURANCE_AGENCIES if a['name'] not in existing_names]

    if not new_agencies:
        print("保険代理店: 追加するデータなし（全て既存）")
        return

    print(f"保険代理店: {len(new_agencies)}件 追加中...")
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/advisors",
        headers=HEADERS,
        data=json.dumps(new_agencies)
    )
    if r.status_code in [200, 201]:
        print(f"  ✅ {len(r.json())}件追加完了")
    else:
        print(f"  ❌ エラー: {r.status_code} - {r.text[:200]}")


def update_website_urls():
    """既知のWebサイトURLを補完"""
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/advisors?website_url=is.null&select=id,name",
        headers=HEADERS
    )
    no_url = r.json()
    print(f"\nWebサイトURL未設定: {len(no_url)}件")

    updated = 0
    for advisor in no_url:
        url = None
        for keyword, known_url in KNOWN_URLS.items():
            if keyword in advisor['name']:
                url = known_url
                break

        if url:
            r = requests.patch(
                f"{SUPABASE_URL}/rest/v1/advisors?id=eq.{advisor['id']}",
                headers=HEADERS,
                data=json.dumps({"website_url": url})
            )
            if r.status_code in [200, 204]:
                print(f"  ✅ {advisor['name']} → {url}")
                updated += 1

    print(f"URL更新: {updated}件")


def print_summary():
    """最終サマリー"""
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/advisors?select=id",
        headers={**HEADERS, "Prefer": "count=exact"}
    )
    total = r.headers.get('content-range', '').split('/')[-1]

    r2 = requests.get(
        f"{SUPABASE_URL}/rest/v1/advisors?website_url=not.is.null&select=id",
        headers={**HEADERS, "Prefer": "count=exact"}
    )
    with_url = r2.headers.get('content-range', '').split('/')[-1]

    print(f"\n📊 最終サマリー")
    print(f"  総登録数: {total}")
    print(f"  URL設定済み: {with_url}")


def main():
    add_insurance_agencies()
    update_website_urls()
    print_summary()


if __name__ == "__main__":
    main()
