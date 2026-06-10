const { test, expect } = require("@playwright/test");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const pageUrl = pathToFileURL(path.resolve(__dirname, "..", "index.html")).href;

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl);
});

test("renders the personal card", async ({ page }) => {
  await expect(page.getByText("Open for connection", { exact: true })).toBeVisible();
  await expect(page.getByText("Personal Card", { exact: true })).toBeVisible();
  await expect(page.locator(".card")).toBeVisible();
});

test("shows contact actions", async ({ page }) => {
  await expect(page.getByRole("link", { name: /your\.email@example\.com/i })).toHaveAttribute(
    "href",
    "mailto:your.email@example.com"
  );
  await expect(page.getByRole("button", { name: "WeChat ID" })).toBeVisible();
});

test("reveals the WeChat popover on click", async ({ page }) => {
  await page.getByRole("button", { name: "WeChat ID" }).click();

  await expect(page.locator("[data-wechat-popover]")).toHaveClass(/is-visible/);
  await expect(page.locator("[data-wechat-popover] strong")).toHaveText("WeChat ID");
});

test("tracks pointer position for the cursor glow", async ({ page }) => {
  await page.evaluate(() => {
    window.dispatchEvent(new PointerEvent("pointermove", { clientX: 140, clientY: 160 }));
  });

  await expect
    .poll(async () =>
      page.evaluate(() => ({
        x: document.documentElement.style.getPropertyValue("--cursor-x"),
        y: document.documentElement.style.getPropertyValue("--cursor-y")
      }))
    )
    .toEqual({ x: "140px", y: "160px" });
});
