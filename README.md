# Software Testing Lab

Syed Muhammad Rayyan - 23K-0624

Automation using Playwright with JavaScript.

| Folder | Content |
|---|---|
| PlaywrightAutomation | Lab 01 - Lab 05 (Setup, Data Driven Testing, POM, Allure Reporting, Hooks) |
| PlaywrightAPIAutomation | Lab 06 (API Automation) |
| SyedMuhammadRayyan_23K-0624_AdactinAutomation | Assignment 03 (End to End Automation of Adactin Hotel App) |
| PerformanceTesting | Assignment 04 (Performance Testing using Apache JMeter) |

## Run

```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Run JMeter Test Plan (Non-GUI)

```
jmeter -n -t PerformanceTesting/Task02_MultipleUsers.jmx -l results.jtl -e -o report
```
