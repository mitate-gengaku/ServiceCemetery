# 
## 背景
サービスを公開したがユーザーに使用されなかった、モチベーションがなくなって途中でやめてしまったなど日の目を見ることなく終了したプロジェクトの供養場所みたいなものがほしいと思い作りました。パブリックリポジトリを対象としています。

## トップ画面
お墓は亡くなられた方を埋葬している神聖な場所であると考えているため、無礼にならないことを心がけ極めてシンプルでゲーム風のUIを実装しました。

![トップ画面](./top.png)

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