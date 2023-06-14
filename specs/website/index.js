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

        await browsers[configs.browser].call(this);


        // Setting the implicit wait timeout
        await this.driver.manage().setTimeouts({ implicit: 500 });
    }

    async startSessionChrome() {
        const Chrome = require('selenium-webdriver/chrome');
        const options = new Chrome.Options();

        // Creating a new session corresponds with the W3C command for New session
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    async startSessionFirefox() {
        const firefox = require('selenium-webdriver/firefox');
        const options = new firefox.Options();

        this.driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
    }

    async startSessionEdge() {
        const edgedriver = require('@sitespeed.io/edgedriver');
        const edge = require('selenium-webdriver/edge');

        // Creating a new session corresponds with the W3C command for New session
        let options = new edge.Options();
        this.driver = await new Builder()
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
}

module.exports = WebBrowser;
