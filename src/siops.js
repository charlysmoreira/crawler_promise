const puppeteer = require('puppeteer');
const SolrInsertData = require('./solrInsertData');

const scrape = async (param) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    let url = param.baseUri;
    if (url === undefined) {
        url = `${param.url}S=1&UF=${param.uf}&Municipio=${param.ibge};&Ano=${param.ano}&Periodo=${param.periodo}`;
    }

    await page.goto(url);
    await page.click('#container > div:nth-child(2) > form > div:nth-child(3) > div > input[type="Submit"]:nth-child(2)');
    await page.waitFor(5000);

    const result = await page.evaluate(() => {
        let ano_exercicio = document.querySelector('#arearelatorio > div.informacao > div > div:nth-child(2) > table > tbody > tr:nth-child(5) > td');
        let data_homologada = document.querySelector('#arearelatorio > div.informacao > div > div:nth-child(2) > table > tbody > tr:nth-child(6) > td');
        let percentual = document.querySelector('#arearelatorio > div.informacao > div > table:nth-child(15) > tbody > tr > td.tdr.caixa');

        return { 'ano_exercicio': ano_exercicio ? ano_exercicio.innerText : "error",
            'data_homologada': data_homologada ? data_homologada.innerText : "error",
            'percentual' : percentual ? percentual.innerText : "error",
        }
    });
    browser.close();
    result.url = url;
    resultData(result, param);
};

var resultData = function (value, param) {
    new SolrInsertData(value, param).start();
};

module.exports = { scrape };