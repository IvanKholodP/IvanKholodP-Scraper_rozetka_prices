const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://hard.rozetka.com.ua/ua/philips_328e1ca_00/p216240211/';

async function browserSetup() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	return page;
};

async function checkPrice(page){
	const $ = cheerio.load(page);
	let html = await page.evaluate(() => document.body.innerHTML);
	$('.product-prices__big', html).each(function () {
		const price = $(this).text();
		const currentPrice = Number(price.replace(/[^0-9.-]+/g,""));
		console.log(currentPrice);
	});
};

async function monitor(){
	let page = await browserSetup();
	await checkPrice(page);
};

monitor();