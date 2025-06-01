"server only"

import { env } from "@/env"
import { Metadata } from "next"

const title = "RIPro | 失敗も成功も、すべては財産"
const description = "終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう。";
const url = env.BASE_URL
const images = [
  {
    url: `${url}/images/view.jpg`,
    width: 800,
    height: 600,
  }
]

export const rootMetaData: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: "RIPro",
    images,
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    title,
    description,
    card: "summary",
    images,
  }
}