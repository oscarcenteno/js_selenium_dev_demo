const { expect } = require('chai');
const questions = require('./web_form.questions');
const actions = require('./web_form.actions');

describe('Web Form', () => {

    it('Questions do not change the state of the system', async () => {
        const title = await questions.getTitle();

        expect(title).to.equal("Web form");
    });

    it('Actions modify the state of the system', async () => {
        const message = await actions.submitWebForm();

        expect(message).to.equal("Received!");
    });
});