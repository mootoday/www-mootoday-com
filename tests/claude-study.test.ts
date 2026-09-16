import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import type { StudyMap } from '../src/lib/claude-study/types';

const map: StudyMap = JSON.parse(
	readFileSync(
		new URL('../src/content/blog/learn-claude-code/study-map.json', import.meta.url),
		'utf8'
	)
);
const inStage = (n: number) => map.concepts.filter((c) => c.stage === n);

test.describe('Claude study map', () => {
	test('marking a concept learned moves to the next concept in its stage', async ({ page }) => {
		const [first, second] = inStage(1);
		await page.goto('/blog/learn-claude-code');
		await page.locator(`[data-id="${first.id}"]`).first().click();
		await page.getByRole('button', { name: 'Mark as learned' }).click();
		await expect(page.locator('aside.pn h2')).toHaveText(second.title);
	});

	test('marking the last concept of a stage moves to the next stage', async ({ page }) => {
		const last = inStage(1).at(-1)!;
		await page.goto('/blog/learn-claude-code');
		await page.locator(`[data-id="${last.id}"]`).first().click();
		await page.getByRole('button', { name: 'Mark as learned' }).click();
		await expect(page.locator('aside.pn h2')).toHaveText(map.stages[1].name);
	});

	test('unmarking a learned concept stays on it', async ({ page }) => {
		const [first] = inStage(1);
		await page.goto('/blog/learn-claude-code');
		await page.locator(`[data-id="${first.id}"]`).first().click();
		await page.getByRole('button', { name: 'Mark as learned' }).click();
		await page.locator(`[data-id="${first.id}"]`).first().click();
		await page.getByRole('button', { name: 'Learned', exact: true }).click();
		await expect(page.locator('aside.pn h2')).toHaveText(first.title);
	});

	test('remembers a learned concept across reloads', async ({ page }) => {
		await page.goto('/blog/learn-claude-code');
		await page.locator('[data-id="hooks-guide"]').first().click();
		await page.getByRole('button', { name: 'Mark as learned' }).click();
		await expect(page.locator('nav .seg').first()).toContainText(/(^|\D)1 of \d+ learned/);

		await page.reload();
		await expect(page.locator('nav .seg').first()).toContainText(/(^|\D)1 of \d+ learned/);
	});

	test('migrates progress from the original map', async ({ page }) => {
		await page.addInitScript(() => {
			if (!localStorage.getItem('claude-study:v2')) {
				localStorage.setItem('cc-day-map:v1', JSON.stringify({ learned: ['hooks', 'automem'] }));
			}
		});
		await page.goto('/blog/learn-claude-code');
		await expect(page.locator('nav .seg').first()).toContainText(/(^|\D)2 of \d+ learned/);
	});

	test('redirects the old URL', async ({ page }) => {
		await page.goto('/blog/learn-claude-code-in-a-day');
		await expect(page).toHaveURL(/\/blog\/learn-claude-code$/);
	});
});
