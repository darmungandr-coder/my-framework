

````md
# Playwright Test Framework

A UI test automation framework built with **Playwright** and **TypeScript/JavaScript**.

This project is my learning and practice repository where I build a structured E2E automation framework, improve test design, and practice real-world QA automation approaches.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- HTML Playwright Report

## Project Goals

- Build a clean and understandable E2E test framework
- Practice Page Object Model
- Improve UI test automation skills with Playwright
- Learn how to organize locators, pages, utilities, and tests
- Prepare a framework structure close to real QA Automation work

## Project Structure

my-framework/
│
├── .github/workflows/      # CI workflows
├── Pages/                  # Page Object classes
├── Utiles/                 # Helper functions / test data / utilities
├── tests/                  # Test files
├── playwright-report/      # Generated HTML reports
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
````

## Features

* Page Object Model structure
* Reusable helpers and utilities
* Separate test files
* Playwright HTML reporting
* Debug and UI execution modes
* Ready for further CI/CD improvements

## Installation

Clone the repository:

```bash
git clone https://github.com/darmungandr-coder/my-framework.git
cd my-framework
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run tests in debug mode:

```bash
npm run test:debug
```

Repeat tests 5 times:

```bash
npm run test:repeat
```

Open HTML report:

```bash
npm run report
```

## Current Configuration

At the moment, the framework is configured to:

* run tests from the `tests` folder
* use the HTML reporter
* run on Chromium
* collect trace on first retry
* use CI-friendly retries/workers configuration

## What I Am Practicing Here

In this repository I focus on:

* writing readable and maintainable tests
* separating test logic from page logic
* organizing locators and methods in Page Objects
* improving test data handling
* building a framework step by step instead of keeping everything in one test file

## Planned Improvements

* better test data management
* API helpers
* environment variables support
* better CI setup
* screenshots / traces / attachments improvements
* Allure or extended reporting
* more negative and edge-case scenarios

## Notes

This repository is part of my QA Automation learning path.
I currently work in QA and Release Management, and I am actively developing my automation skills with Playwright.

