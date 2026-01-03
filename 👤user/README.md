# E2Eテスト

このディレクトリはCucumber + Playwrightを使用したE2Eテストです。

## 構造

```
👤user/
  want-to/              # ユーザーが「したいこと」のテスト
  need-to/              # ユーザーが「必要なこと」のテスト
```

各テストは以下で構成されています：
- `*.feature` - Gherkin形式のテストシナリオ
- `*.steps.ts` - テストステップの実装
- `value.md` - テストの価値や背景を記述（オプション）

## 実行方法

```bash
# Cucumberテストを実行
npm test

# Playwrightのインタラクティブモードで実行
npm run test:ui

# テストレポートを表示
npm run test:report
```

## 環境変数

- `BASE_URL` - テスト対象のベースURL（デフォルト: http://localhost:3000）
