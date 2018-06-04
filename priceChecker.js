const puppeteer = require('puppeteer');

let searchBox = '#twotabsearchtextbox';
let searchTerm = 'Nvidia GeForce GTX 1050 ti';
let clickItem = '[data-attribute*="EVGA GeForce GTX 1050 Ti SC GAMING, 4GB GDDR5, DX12 OSD Support (PXOC) Graphics Card 04G-P4-6253-KR"]';

let main = async function (){
  //Create Browser and a new tab inside that browser
  const browser = await puppeteer.launch({dumpio: false, headless:false, slowMo: 100});
  const page = await browser.newPage();
  
  //Navigate to Amazon's home page
  await page.goto('https://www.amazon.com');
  
  //Type the search string into the text box and wait for navigation to the page
  await page.type(searchBox, searchTerm);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  
  //Click the item we want
  await page.click(clickItem);
  await page.waitForNavigation();
  
  //Check the price on the page and output to screen
  let price = await page.evaluate(() => document.querySelector('#priceblock_ourprice').textContent);
  console.log("Current Price: "+price);

  //close the browser
  await browser.close();
};

//Run the main function
main();