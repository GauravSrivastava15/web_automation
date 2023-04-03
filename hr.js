 const loginLink = "https://www.hackerrank.com/auth/login";

let puppeteer = require('puppeteer');
const { answers } = require('./code');

let email = 'bagohil613@robhung.com';
let password = "gaurav15"

const codeFile = require('./code')

let page

console.log('Before');
let browserWillbeLauncedPromise = puppeteer.launch({
    headless: false,  //browser is visible
    defaultViewport: null,   //FullScreen browser
    args: ['--start-maximized'],
})

browserWillbeLauncedPromise.then(function (browerInstance) {
    let newTabPromise = browerInstance.newPage();
    return newTabPromise;
}).then(function (newTab) {
    console.log('New Tab Opened');
    page = newTab
    let pageWillbeOpenedPromise = newTab.goto(loginLink)

    return pageWillbeOpenedPromise
}).then(function () {
    let typedEmailPromise = page.type('input[id="input-1"]', email, { delay: 40 })

    return typedEmailPromise

}).then(function () {
    let typePasswordPromise = page.type('input[id="input-2"]', password, { delay: 100 })

    return typePasswordPromise
}).then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', { delay: 70 })

    return loginPromise
}).then(function () {
    let algoWillBeclickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return algoWillBeclickedPromise;
}).then(function () {
    let getToWarmupPromise = waitAndClick('input[value="warmup"]', page)
    return getToWarmupPromise
}).then(function () {
    let ChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 })
    return ChallengesArrPromise
}).then(function (questionsArr) {
    console.log("No of Questions" + questionsArr.length)

    let questionWillBeSolvedPromise = questionSolver(page, questionsArr[0], codeFile.answers[0])
});



function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector);
        waitForModalPromise.then(function () {
            let clickModalPromise = cPage.click(selector, { delay: 100 })
            return clickModalPromise
        }).then(function () {
            resolve()
        }).catch(function () {
            reject()
        })
    })
}



function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClickedPromise = question.click()
        questionWillBeClickedPromise.then(function(){
            let waitForEditorPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return waitForEditorPromise
        }).then(function () {
            return waitAndClick('.checkbox-input', page)
        }).then(function () {
            return page.waitForSelector('.text-area.custominput')
        }).then(function () {
            return page.type('.text-area.custominput', answer, { delay: 20 })
        }).then(function () {
            let ctrlIsPressedPromise=page.keyboard.down('Control')
            return ctrlIsPressedPromise
        }).then(function(){
            let AIsPressedPromise=page.keyboard.press('A',{delay:20})
            return AIsPressedPromise
        }).then(function(){
            let XisPressedPromise=page.keyboard.press('X',{delay:20})
            return XisPressedPromise
        }).then(function(){
            let ctrlIsReleasedPromise=page.keyboard.up('Control')
            return ctrlIsReleasedPromise
        }).then(function(){
            let waitForEditorPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return waitForEditorPromise
        }).then(function(){
            let ctrlIsPressedPromise=page.keyboard.down('Control')
            return ctrlIsPressedPromise
        }).then(function(){
            let AisPressedPromise = page.keyboard.press('A' , {delay : 20});
            return AisPressedPromise
          }).then(function(){
            let VisPressedPromise = page.keyboard.press('V' , {delay:20})
            return VisPressedPromise
         }).then(function(){
          let ctrlIsReleasedPromise = page.keyboard.up('Control')
          return ctrlIsReleasedPromise
       }).then(function(){
          return page.click('.hr-monaco__run-code' , {delay : 20})
       }).then(function(){
         resolve()
       }).catch(function(err){
         console.log(err)
       })



    })
}

console.log('After')
















// let puppeteer=require('puppeteer')

//

// let browserWillbeLaunced=puppeteer.launch({
//     headless:false,
//     defaultViewport:null,
//     args:['--start-maximized']

// })

// browserWillbeLaunced.then(function(browerInstance){
//     let newTab=browerInstance.newPage();
//     return newTab;
// }).then(function(tab){
//     let newWebsite=tab.goto(loginLink)
// })
