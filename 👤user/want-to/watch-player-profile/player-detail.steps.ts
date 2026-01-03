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
});

Then('プレイヤー名{string}が表示される', async function (name: string) {
  // プレイヤー名の要素が表示されていることを確認
  await expect(page.locator('h2')).toHaveText(name);
  
  // クリーンアップ
  await page.close();
  await browser.close();
});


Then('バトル履歴が8個以上は表示される', async function () {
  const battleHistoryItems = page.locator('[data-testid="battle-history-item"]');
  const itemCount = await battleHistoryItems.count();
  // brawl stars apiの使用上、25セットのバトル履歴が返ってくる。
  // そして、ガチバトルの場合は最大３セット分のバトル履歴を1つにまとめて表示する
  // 25 / 3 = 8.33 よって、8個以上のバトル履歴が表示されることを確認する
  expect(itemCount).toBeGreaterThanOrEqual(8);
  
  // クリーンアップ
  await page.close();
  await browser.close();
});