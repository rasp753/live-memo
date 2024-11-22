## Live Memo

行く予定または行ったライブやイベントの管理アプリです

当日までの日数のカウントダウン機能や、チケット申し込みなどのTodo管理機能があります。

<img src="./resources/js/Logo.png" style="zoom: 10%;" />

## デプロイ先
https://live-memo-307c4b082499.herokuapp.com/

### テストアカウント
ID/Email: demo@example.com
PW: demodemo

## 使用技術

-   フロントエンド

    -   React
    -   TypeScript
    -   Tailwind CSS
    -   shadcn/ui (UIライブラリ)

-   バックエンド
    -   PHP 8
    -   Laravel 11
    -   Inertia.js
-   インフラ
    -   Heroku
    -   Postgre SQL

## 機能一覧

-   ユーザー登録, ログイン機能 (Laravel Breeze)
-   イベント管理機能
    -   登録, 編集, 削除機能
    -   タグ付け機能
    -   検索機能（インクリメンタルサーチ）
-   Todo管理機能
    -   追加, 削除
    -   期日設定
    -   重要フラグ設定
-   ホーム画面
    -   次にあるイベントまでのカウントダウン
    -   ３０日以内に期日の来るTodoの表示

## 制作背景・工夫した点

頻繁に多くのライブなどのイベントに行くため、チケットの申し込みや事前準備など忘れかけてしまうことがあったため、専用の管理アプリがあったらいいなと思い作りました。
快適にサクサク使えるアプリになるように、各機能の目的に合わせて使いやすいUIで実装した点が工夫した点です。
