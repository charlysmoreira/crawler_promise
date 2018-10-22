var SolrUpdate = require('solrClientApi').SolrUpdate;
var SolrDocBuild = require('./solrDocBuild');

class SolrInsertData {

    constructor(doc, param) {
        this.docObject = doc;
        this.param = param;
    }

    start() {
        if (this.docObject.percentual !== 'error') {
            var solrUpdate = new SolrUpdate(this.param.siopsConfig);

            const docFromSolr = new SolrDocBuild(this.param, this.docObject).createDocFromSiops();
            
            var promise = solrUpdate.update(docFromSolr);

            return Promise.all([ promise ]);
        }
    };
}

module.exports = SolrInsertData;