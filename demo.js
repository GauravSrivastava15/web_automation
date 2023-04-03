let puppeteer=require('puppeteer')


console.log('Before');
let browserWillbeLauncedPromise=puppeteer.launch({
    headless:false,  //browser is visible
    defaultViewport:null,   //FullScreen browser
    args:['--start-maximized'],
})

browserWillbeLauncedPromise.then(function(browerInstance){
    let newTabPromise=browerInstance.newPage();
    return newTabPromise;
}).then(function(newTab){
    console.log('New Tab Opened');

    let pageWillbeOpenedPromise=newTab.goto('https://www.pepcoding.com/')

    return pageWillbeOpenedPromise
}).then(function(webPage){
    console.log('Website Opened');
})


console.log('After')