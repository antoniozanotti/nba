import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  playersColumns,
  firstPlayer,
  secondPlayer,
  lastPlayer,
  firstPlayerSecondPage,
  antonioPlayer,
} from "../mocks/players";

test.describe("Players", () => {
  test("should display elements", async ({ page }) => {
    await page.goto("/");

    await test.step("should display elements", async () => {
      // Meta Title
      await expect(page).toHaveTitle(/NBA Players/);

      // Title
      await expect(
        page.getByRole("heading", { level: 1, name: "NBA Players" })
      ).toBeVisible();
    });

    await test.step("should display Table Head", async () => {
      const ths = await page.locator("table th");
      for (let i = 0; i < 5; ++i) {
        await expect(ths.nth(i)).toContainText(playersColumns[i]);
      }
    });

    await test.step("should match screenshot", async () => {
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveScreenshot();
    });

    await test.step("should not be have accessibility issues", async () => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .options({ rules: { "nested-interactive": { enabled: false } } })
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test("should order by name", async ({ page }) => {
    await page.goto("/");

    await test.step("should display results in ASC Order", async () => {
      const tds = await page.locator("table td");
      for (let i = 0; i < 4; ++i) {
        await expect(tds.nth(i)).toContainText(firstPlayer[i]);
      }
    });

    await test.step("should display results in DESC Order", async () => {
      const nameHeading = await page.getByRole("button", { name: "Name" });
      await nameHeading.click();
      const tds = await page.locator("table td");
      for (let i = 0; i < 4; ++i) {
        await expect(tds.nth(i)).toContainText(lastPlayer[i]);
      }
      await nameHeading.click();
    });
  });

  test("should filter by name", async ({ page }) => {
    await page.goto("/");

    await test.step("should filter by name", async () => {
      const input = await page.getByPlaceholder("Filter by player name...");
      await input.fill("antonio");
      const tds = await page.locator("table td");
      for (let i = 0; i < 4; ++i) {
        await expect(tds.nth(i)).toContainText(antonioPlayer[i]);
      }

      await input.fill("zanotti");
      await expect(page.getByText("No results.")).toBeVisible();
    });
  });

  test("should display pagination", async ({ page }) => {
    await page.goto("/");

    await test.step("should go to next page", async () => {
      const nextButton = await page.getByRole("button", { name: "Next" });
      await nextButton.click();
      const tds = await page.locator("table td");
      for (let i = 0; i < 4; ++i) {
        await expect(tds.nth(i)).toContainText(firstPlayerSecondPage[i]);
      }
    });

    await test.step("should go to previous page", async () => {
      const previousButton = await page.getByRole("button", {
        name: "Previous",
      });
      await previousButton.click();
      const tds = await page.locator("table td");
      for (let i = 0; i < 4; ++i) {
        await expect(tds.nth(i)).toContainText(firstPlayer[i]);
      }
    });
  });

  test("should edit player", async ({ page }) => {
    await page.goto("/");

    const actionsFirstRow = await page.getByRole("button").nth(1);
    await actionsFirstRow.click();

    const editButton = await page.getByRole("menuitem", { name: "Edit" });
    await editButton.click();

    await page.getByRole("textbox").first().fill("Ricardo");

    const saveButton = await page.getByRole("button", { name: "Save" });
    await saveButton.click();

    const successMessage = await page.getByText("Success").first();
    await expect(successMessage).toBeVisible();
  });

  test("should delete player", async ({ page }) => {
    await page.goto("/");

    const actionsFirstRow = await page.getByRole("button").nth(1);
    await actionsFirstRow.click();

    const editButton = await page.getByRole("menuitem", { name: "Delete" });
    await editButton.click();

    const saveButton = await page.getByRole("button", { name: "Continue" });
    await saveButton.click();

    const successMessage = await page.getByText("Success").first();
    await expect(successMessage).toBeVisible();

    const tds = await page.locator("table td");
    for (let i = 0; i < 4; ++i) {
      await expect(tds.nth(i)).toContainText(secondPlayer[i]);
    }
  });
});
