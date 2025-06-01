# RIPro
### 終了したプロジェクトの記録と教訓を大切に保存するサービスです。成功も失敗も、すべての経験を組織の財産として継承し、次世代のプロジェクトに活かします。過去から学び、未来を創るため共有しましょう。

<table>
	<thead>
    	<tr>
      		<th style="text-align:center"><a href="README-en.md">English</a></th>
      		<th style="text-align:center">日本語</th>
    	</tr>
  	</thead>
</table>

## 背景
サービスを公開したがユーザーに使用されなかった、モチベーションがなくなって途中でやめてしまったなど日の目を見ることなく終了したプロジェクトの供養場所みたいなものがほしいと思い作りました。パブリックリポジトリを対象としています。

## トップ画面
シンプルでゲーム風のお墓のUIを実装しました。

![トップ画面](/top.jpg)

## 使用技術
T3 Stackといわれる構成です。

主に使用いるのは以下のとおりです。
- Next.js
- NextAuth(Auth.js)
- PostgreSQL(Neon)
- Redis(Upstash)
- tRPC
- TailwindCSS
- shadcn/ui
- Three.js
- @react-three/fiber
- @react-three/drei

## プロジェクト構成
- `src/` - Next.jsアプリケーションのソースコード
- `docker-compose.yml` - Dockerコンテナの設定
- `Dockerfile` - アプリケーションのDockerイメージの定義

## 開始方法
このプロジェクトはDockerコンテナ内でNext.jsアプリケーションを管理する構成になっています。以下の手順に従って開始してください。

### 前提条件
- Docker
- Docker Compose

### 起動手順
1. リポジトリをクローン
```bash
git clone https://github.com/mitate-gengaku/cemetery-app

cd cemetery-app
```

2. Dockerコンテナを起動
`http://localhost:3000`でアクセスできます。

```bash
docker-compose up -d
docker-compose exec app bash
npm run dev
```

コンテナを停止する
```bash
docker-compose down
```