const { Builder } = require('selenium-webdriver');
require('dotenv').config();

class WebBrowser {

    constructor() {
        this.driver = undefined
    }

    async startSession() {
        // Creating a new session corresponds with the W3C command for New session
        const configs = {
            browser: process.env.BROWSER || 'chrome'
        }

        const browsers = {
            chrome: this.startSessionChrome,
            firefox: this.startSessionFirefox,
            edge: this.startSessionEdge
        }

        const selenium_host = process.env.SELENIUM_HOST || 'selenium'
        const driver = await this.getDriver(selenium_host)
        await browsers[configs.browser].call(this, driver);

        // Setting the implicit wait timeout
        await this.driver.manage().setTimeouts({ implicit: 500 });
    }

    async getDriver(selenium_host) {
        const driver = new Builder();

        if (selenium_host === 'localhost') {
            return driver;
        }
        else {
            return driver.usingServer(`http://${selenium_host}:4444`);
        }
    }

    async startSessionChrome(driver) {
        const Chrome = require('selenium-webdriver/chrome');
        const options = new Chrome.Options();

        // Creating a new session corresponds with the W3C command for New session
        this.driver = await driver
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    async startSessionFirefox(driver) {
        const firefox = require('selenium-webdriver/firefox');
        const options = new firefox.Options();

        this.driver = await driver
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
    }

    async startSessionEdge(driver) {
        const edgedriver = require('@sitespeed.io/edgedriver');
        const edge = require('selenium-webdriver/edge');

        // Creating a new session corresponds with the W3C command for New session
        let options = new edge.Options();
        this.driver = await driver
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .setEdgeService(new edge.ServiceBuilder(edgedriver.binPath()))
            .build();
    }

    async openPage(url) {
        await this.driver.get(url);
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async type(locator, text) {
        let textBox = await this.driver.findElement(locator);
        await textBox.sendKeys(text);
    }

    async clickButton(locator) {
        let clickableElement = await this.driver.findElement(locator);
        await clickableElement.click();
    }

    async getText(locator) {
        let textElement = await this.driver.findElement(locator);
        return await textElement.getText();
    }

    async endSession() {
        await this.driver.quit()
    }

    async takeScreenshot(testName) {
        const fs = require('fs');

        if (this.driver) {
            // Take a screenshot of the result page
            const filename = testName
                .replace(/['"]+/g, '')
                .replace(/[^a-z0-9]/gi, '_')
                .toLowerCase();;
            const encodedString = await this.driver.takeScreenshot();
            await fs.writeFileSync(`./screenshots/${filename}.png`,
                encodedString, 'base64');
        }
    }

}

module.exports = WebBrowser;
