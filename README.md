# Playwright E2E Demo Framework

[![Playwright Tests](https://github.com/darmungandr-coder/my-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/darmungandr-coder/my-framework/actions/workflows/playwright.yml)

Learning-focused end-to-end UI automation framework built with Playwright, TypeScript, and Page Object Model patterns.

This repository is designed as both:
- a practical QA automation playground
- a small demo project that shows test structure, CI execution, and report publishing

## Quick Access

- Workflow runs: [GitHub Actions](https://github.com/darmungandr-coder/my-framework/actions/workflows/playwright.yml)
- Repository: [my-framework](https://github.com/darmungandr-coder/my-framework)
- Planned report URL: `https://darmungandr-coder.github.io/my-framework/`

## Why This Repo Exists

This project helps me practice building a clean automation framework step by step instead of keeping everything inside a single test file.

Main focus areas:
- readable Playwright tests
- reusable page objects
- stable locator strategy
- practical assertions
- GitHub Actions execution
- Playwright and Allure reporting

## Demo Snapshot

What this repository demonstrates:

| Area | What is shown here |
| --- | --- |
| Test automation | UI flows implemented with Playwright |
| Design approach | Page Object Model and separated test logic |
| CI | Manual test execution through GitHub Actions |
| Reports | Playwright HTML report and Allure report |
| Delivery | Allure report prepared for GitHub Pages publishing |

## Covered Scenarios

The current suite focuses on core authentication and contact flows on `https://automationexercise.com/`.

- Register user
- Login with valid credentials
- Login with invalid credentials
- Logout user
- Register with existing email
- Contact Us form

## Tech Stack

- Node.js
- Playwright
- TypeScript
- GitHub Actions
- Allure Report
- GitHub Pages

## Project Structure

```text
my-framework/
├── .github/workflows/      CI workflow
├── Pages/                  Page Object classes
├── Utiles/                 Test data and helpers
├── tests/                  Playwright specs
├── playwright.config.ts    Playwright configuration
├── package.json            Scripts and dependencies
└── README.md
```

## Run Locally

Install dependencies:

```bash
npm install
```

Run the full suite:

```bash
npm test
```

Run tests and open Allure locally:

```bash
npm run test:allure
```

Useful extra commands:

```bash
npm run test:headed
npm run test:ui
npm run test:debug
npm run test:repeat
npm run report
npm run allure:open
```

## Reports

This project produces:

- Playwright HTML report
- Allure report

Local viewing:

- Playwright HTML: `npm run report`
- Allure: `npm run allure:open`

GitHub viewing:

- workflow artifacts store both reports
- Allure can be published to GitHub Pages for browser access by link

## CI Setup

The workflow in [playwright.yml](/c:/Users/Gladk/Desktop/my-framework/my-framework/.github/workflows/playwright.yml):

- runs manually from the GitHub Actions tab
- uses an official Playwright Docker image
- installs Java for Allure report generation
- runs Playwright in CI
- generates and uploads reports
- is prepared to publish the Allure report through GitHub Pages

## How To Turn This Into A Better Portfolio Demo

If you want the repository to look stronger to recruiters, hiring managers, or teammates, these upgrades will have the biggest visual impact:

1. Add a screenshot of the Allure report near the top of the README.
2. Add a screenshot of a successful GitHub Actions run with artifacts or Pages deployment.
3. Create a `docs/` folder with `demo-report.png` and `demo-actions.png`.
4. Add a short `Architecture` section that explains `tests/`, `Pages/`, and `Utiles/`.
5. Use `test.step()` in important tests so the report reads like a guided scenario.
6. Add one small status table with browser, CI mode, and report availability.
7. Keep the main branch green so the badge always looks trustworthy.

## Suggested Demo Layout

If you want this repository to feel polished, this is the best presentation order:

1. Badge + one-sentence project value
2. Direct links to Actions and report
3. Screenshot or GIF
4. Covered scenarios
5. Tech stack
6. Local run commands
7. CI and reporting details

## Notes

- The application under test is external: `https://automationexercise.com/`
- Because of that, some elements or flows may behave differently over time
- GitHub Pages must be enabled in repository settings before the report link becomes active
