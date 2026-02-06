import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { expect } from '@playwright/test';

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;

Given('ブロスタのゲーム内に{string}のタグを持つプレイヤーが存在している', async function (tag: string) {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
});

When('ユーザーが{string}をtagのinputに入力した', async function (tag: string) {
  const baseURL = process.env.BASE_URL || 'http://localhost:3333/ja/home';
  await page.goto(baseURL);
  const input = page.locator('input[data-testid="player-tag-input"]');
  await input.fill(tag);
  await input.press('Enter');
  
  // ページ遷移を待つ
  await page.waitForURL(`**/${tag.toUpperCase()}`, { timeout: 10000 });
});

//　シナリオ: プレイヤーの名前を確認する
Then('プレイヤー名{string}が表示される', async function (name: string) {
  // プレイヤー名の要素が表示されていることを確認
  await expect(page.locator('h2')).toHaveText(name);
  
  // クリーンアップ
  await page.close();
  await browser.close();
});


// シナリオ: バトル履歴を見る
Then('バトル履歴が{string}個以上は表示される', async function (count: string) {
  // バトル履歴のアイテムが表示されるまで待つ
  await page.waitForSelector('[data-testid="battle-history-item"]', { timeout: 10000 });
  
  const battleHistoryItems = page.locator('[data-testid="battle-history-item"]');
  const itemCount = await battleHistoryItems.count();
  // brawl stars apiの仕様上、25セットのバトル履歴が返ってくる。
  // そして、ガチバトルの場合は最大３セット分のバトル履歴を1つにまとめて表示する
  // 25 / 3 = 8.33 よって、8個以上のバトル履歴が表示されることを確認する
  expect(itemCount).toBeGreaterThanOrEqual(parseInt(count, 10));
  
  // クリーンアップ
  await page.close();
  await browser.close();
});

// シナリオ: 使えるブロウラーを見る
Then('使用できるブロウラーが{string}体表示される', async function(count: string) {
  await page.waitForSelector('[data-testid="brawler-item-count"]', { timeout: 10000 });

  const brawlerCount = await page.locator('[data-testid="brawler-item-count"]').textContent();

  // テストで使用しているプレイヤーY2YPGCGC(neco3)は頻繁にゲームで使っているアカウントなので、
  // 新キャラが出てクレジットが溜まれば新しいブロウラーが使用可能になって
  // ブロウラーの数が増えてテストが失敗する可能性がある。
  // なので、テストが失敗したらゲームのアカウントのブロウラー数を確認して、テストを修正する必要がある。
  expect(brawlerCount).toBe(count);

  // クリーンアップ
  await page.close();
  await browser.close();  
})