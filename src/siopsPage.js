var request = require('request'),
    cheerio = require('cheerio'),
    serverSipos = require('./siops');


const DEFAULT_CONFIG = {
        url: 'http://siops.datasus.gov.br/consleirespfiscal.php?'
    };

const BASE_CONFIG = {
        baseUri : 'http://siops.datasus.gov.br/consleirespfiscal.php?S=1&UF=23&Municipio=231330;&Ano=2017&Periodo=2'
    };

const getUfCode = function (ibgeCode) {
        return ibgeCode.substring(0,2);
    };

const getIBGECodes = function () {
        return ['231330','230370','230440', '231290'];
    };

class CrawlerSiops {

    constructor (siopsConfig) {
        DEFAULT_CONFIG.siopsConfig = siopsConfig;
        BASE_CONFIG.siopsConfig = siopsConfig;
        this.start();
    }
    start () {
        request(DEFAULT_CONFIG.url, function (error, response, body) {
            var $ = cheerio.load(body);
            var promiseList = [asyncScrape(BASE_CONFIG)];
            DEFAULT_CONFIG.ano = $('#cmbAno option').val();
            getIBGECodes().forEach((ibgeCode) => {
                DEFAULT_CONFIG.uf = getUfCode(ibgeCode);
                DEFAULT_CONFIG.ibge = ibgeCode;
                $('#cmbPeriodo option').each(function(i) {
                    DEFAULT_CONFIG.periodo = $(this).val()
                    promiseList.push(asyncScrape(DEFAULT_CONFIG));
                });
            });
            Promise.all(promiseList);
        });
    }
}

var asyncScrape = function(params) {
    return new Promise(function (resolve, reject) {
        serverSipos.scrape(params);
    });
};

module.exports = CrawlerSiops;