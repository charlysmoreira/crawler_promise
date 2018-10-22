#!/usr/bin/env node
/*jshint esversion: 6*/
/*global require*/
'use strict';
var argv = require('yargs')
    .usage('$0 [args]')
    .option('host', {
        alias: 'h',
        demand: true,
        describe: 'Solr host whith port',
        type: 'string'
    })
    .option('core', {
        alias: 'c',
        demand: true,
        describe: 'Solr core/gestao_conhecimento',
        type: 'string'
    })
    .strict()
    .help()
    .argv;

const CrawlerSiops = require('./siopsPage');

const start = () => {
    let siopsConfig = {
        host: argv.host,
        core: argv.core
    };
    let crawler = new CrawlerSiops(siopsConfig);
};

start();