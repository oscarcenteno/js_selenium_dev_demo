// Actions: atomic actions to the application (cannot be divided since they require a browser instance)

const WebBrowser = require('../website');
const page = require('./web_form.page.js')

class Questions {
    async getTitle() {
        const browser = new WebBrowser();
        await browser.startSession();
        await browser.openPage(page.url)

        let title = await browser.getTitle();
        await browser.endSession()

        return title;
    }

}

module.exports = new Questions();

