import { test, expect } from "@playwright/test";
import * as path from "node:path";

const PAGE_URL = "https://main--color-dropper.netlify.app" as const;
const SAMPLE_FILE_PATH = path.join(__dirname, "sample-file.png");
const SAMPLE_FILE_COLOR_HEX = "#008000ff";
const SAMPLE_FILE_COLOR_RGB = "rgb(0, 128, 0)";

test("has title", async ({ page }) => {
	await page.goto(PAGE_URL);

	await expect(page).toHaveTitle(/Color Dropper | by Ahmad Afshari/);
});

test.describe("load image and functionality", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(PAGE_URL);

		const fileChooserPromise = page.waitForEvent("filechooser");
		await page.getByTestId("file-input").click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(SAMPLE_FILE_PATH);
	});

	test("show image with correct size", async ({ page }) => {
		const imageCanvasBox = await page.getByTestId("image-canvas").boundingBox();

		expect(imageCanvasBox?.width).toBe(256);
		expect(imageCanvasBox?.height).toBe(256);
	});

	test("picker color", async ({ page }) => {
		await page.getByTestId("color-picker-button").click();
		await page
			.getByTestId("image-canvas")
			.hover({ position: { x: 100, y: 100 } });
		const picker = page.getByTestId("picker");
		await picker.click();
		await page.waitForTimeout(500);
		const pickerColor = page.getByTestId("picker-color");
		const selectedColor = page.getByTestId("selected-color");
		const borderColor = await picker.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue("border-color");
		});

		await expect(selectedColor).toHaveText(SAMPLE_FILE_COLOR_HEX);
		await expect(pickerColor).toHaveText(SAMPLE_FILE_COLOR_HEX);
		expect(borderColor).toBe(SAMPLE_FILE_COLOR_RGB);
	});
});
