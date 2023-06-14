// Actions: atomic actions to the application (cannot be divided since they require a browser instance)

const WebBrowser = require('../website');
const page = require('./web_form.page.js')

class Actions {
    async submitWebForm() {
        const browser = new WebBrowser();

        try {
            await browser.startSession();

            await browser.openPage(page.url)
            await browser.type(page.name, 'Selenium')
            await browser.clickButton(page.submitButton);

            return await browser.getText(page.message);
        }
        finally {
            await browser.endSession();
        }
    }
}

module.exports = new Actions();

