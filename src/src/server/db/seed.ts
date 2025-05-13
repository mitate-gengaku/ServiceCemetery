import { db } from "@/server/db";
import { tags } from "@/server/db/schema";

async function main() {
  await db.insert(tags).values([
    { label: "バージョン問題", value: "version-issue" },
    { label: "コードの供養", value: "code-retired" },
    { label: "未完成", value: "incomplete" },
    { label: "リプレイスによる破棄", value: "replaced" },
    { label: "利用者がいなかった", value: "no-users" },
    { label: "インフラの維持費問題", value: "cost-issue" },
    { label: "競合他社の参入", value: "competitor" },
    { label: "生活環境の変化", value: "lifestyle-change" },
    { label: "やる気の低下", value: "no-motivation" },
    { label: "健康問題", value: "health-problem" },
    { label: "技術的負債の増大", value: "tech-debt" },
    { label: "ビジネス戦略の転換", value: "strategy-change" },
    { label: "法規制の変更", value: "law-change" },
    { label: "セキュリティ上の懸念", value: "security" },
    { label: "採算性の悪化", value: "low-profit" },
    { label: "開発リソースの不足", value: "no-dev" },
    { label: "市場ニーズの変化", value: "market-change" },
    { label: "パートナーシップの解消", value: "no-partner" },
    { label: "災害・事故", value: "disaster" },
    { label: "運営体制の限界", value: "operation-limit" },
  ]);
}

main();
