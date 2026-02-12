# Valentine's Quest 💖

Eternal Life Road - 出会いから未来まで、100歩の軌跡を辿る特別なバレンタイン・ゲーム。

## 🌐 サイトの公開と共有方法 (ログイン不要)

このサイトは「ログインなし」で、URLを知っている人なら誰でもスマホで遊べるように公開できます。

### おすすめの公開先: Vercel (一番簡単！)

1. **GitHubにアップロード**: 下記の手順でGitHubにコードをプッシュします。
2. **[Vercel](https://vercel.com) にログイン**: GitHubアカウントで無料登録できます。
3. **`Add New Project`**: GitHubのリポジトリ (`valentine-quest`) を選択して `Deploy` を押すだけ！
4. **発行されたURLを共有**: `https://valentine-quest.vercel.app` のようなURLが発行されます。

**このURLをLINEやメッセージで送るだけで、相手はログイン不要でそのまま遊ぶことができます！**

## 🚀 GitHubへのアップロード手順

1. **GitHubでリポジトリを作成** (https://github.com/new)
2. **ターミナルで以下を実行**:

```bash
git init
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git add .
git commit -m "feat: 100 steps of love with sharing feature"
git branch -M main
git push -u origin main
```

## 🛠 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## ✨ 共有機能
ゴールに到達すると、**「Share Our Journey」**ボタンが表示されます。
これを押すと、LINEやSNSでこのサイトのURLと素敵なメッセージを簡単に共有できます。