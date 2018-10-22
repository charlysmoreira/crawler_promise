/*jshint esversion: 6*/
/*global require, module */
'use strict';

const crypto = require('crypto');

const extractYears = text => {
    let year = text.match(/(\d{2})/g);
    return Array.isArray(year) ? year.slice(2)[0] : year;
};

const extractMonths = text => {
    let month = text.match(/(\d{2})/g);
    return Array.isArray(month) ? month.slice(1)[0] : month;
};

const extractYearsFourDigit = text => {
    let year = text.match(/(\d{4})/g);
    return Array.isArray(year) ? year.slice(-1)[0] : year;
};

class SolrDocBuild {

    constructor(config, docObject){
        this.config = config;
        this.docObject = docObject;
    }

    createDocFromSiops() {
        let id = crypto.createHash('md5').update(this.docObject.url).digest('hex');
        return {
            "id": id,
            "url": this.docObject.url,
            "homologado_year_s" : extractYears(this.docObject.data_homologada),
            "homologado_month_s" : extractMonths(this.docObject.data_homologada),
            "percentual_s" : this.docObject.percentual,
            "years_i": extractYearsFourDigit(this.docObject.ano_exercicio),
            "title": "Demonstrativo da Lei de Responsabilidade Fiscal",
            "title_t_pt": "Saúde",
            "codIbge_s": this.config.ibge !== undefined ? this.config.ibge !== undefined : "231330",
            "indexed_time_dt": new Date().toISOString(),
            "uf_s": this.config.uf !== undefined ? this.config.uf !== undefined : "CE",
            "docType_s" : "SIOPS"
        };
    }
}

module.exports = SolrDocBuild;