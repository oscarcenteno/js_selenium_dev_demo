// Lean Page Object: Locators

const { By } = require('selenium-webdriver');

class Page {
    constructor() {
        this.url = 'https://www.selenium.dev/selenium/web/web-form.html'
        this.name = By.name('my-text');
        this.submitButton = By.css('button');
        this.message = By.id('message')
    }
}

module.exports = new Page();