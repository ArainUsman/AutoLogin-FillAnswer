const puppeteer = require("puppeteer");

const codeObj = require('./code');

const loginLink = 'https://www.hackerrank.com/auth/login';
let page;
const mail = 'diohngbwt@arxxwalls.com';
const password = `\'pe5!dqB`;
// console.log(password);
let browserOpen = puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: null });

browserOpen.then(function (browserObj) {
    let pageOpen = browserObj.newPage();
    return pageOpen;
}).then(function (newTab) {
    page = newTab;
    let openLink = newTab.goto(loginLink);
    return openLink;
}).then(function () {
    let mailType = page.type('input[id="input-1"]', mail, { visible: true });
    return mailType;
}).then(function () {
    // let passwordType = page.type('input[id="input-2"]', password, { visible: true });
    let passwordType = page.type('input[type="password"]', password, { delay: 20 });
    return passwordType;
}).then(function () {
    let loginBtn = page.click('button[type="submit"]');
    return loginBtn;
}).then(function () {
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return clickOnAlgoPromise;
}).then(function () {
    let checkWarupBox = waitAndClick('input[value="warmup"]', page);
    return checkWarupBox;
}).then(function () {
    let waitFor5Sec = page.waitForTimeout(5000);
    return waitFor5Sec;
}).then(function () {
    let selectAllChallenge = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 30 });
    return selectAllChallenge;
}).then(function (questionArr) {
    console.log('No of Array: ', questionArr.length);
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answer[0]);
    return questionWillBeSolved;
})

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector);
            return clickModal;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionClicked = question.click();
        // return questionClicked;
        questionClicked.then(function () {
            let editorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return editorInFocus;
        }).then(function () {
            return waitAndClick('.checkbox-input', page);
        }).then(function () {
            return page.waitForSelector('textarea.custominput', page);
        }).then(function () {
            return page.type('textarea.custominput', answer, { delay: 2 });
        }).then(function () {
            let cltrIsPressed = page.keyboard.down('Control');
            return cltrIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function () {
            let XisPressed = page.keyboard.press('X', { delay: 100 });
            return XisPressed;
        }).then(function () {
            let cltrIsUnpressed = page.keyboard.up('Control');
            return cltrIsUnpressed;
        }).then(function () {
            let againEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return againEditorInFocus;
        }).then(function () {
            let cltrIsPressed = page.keyboard.down('Control');
            return cltrIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 });
            return AisPressed;
        }).then(function () {
            let VisPressed = page.keyboard.press('V', { delay: 100 });
            return VisPressed;
        }).then(function () {
            let cltrIsUnpressed = page.keyboard.up('Control');
            return cltrIsUnpressed;
        }).then(function () {
            return page.click('.hr-monaco__run-code', { delay: 20 });
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    })
}