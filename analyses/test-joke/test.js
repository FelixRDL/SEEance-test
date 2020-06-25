const fs = require('fs');
const http = require('http');
const core = require('seeance-analysis-core');
const analysis = require('./index');
const analysisPkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const ComponentProvider = core.ComponentProvider;

runTest();

async function runTest() {
    const cp = await ComponentProvider({
        customRepositories: ['FelixRDL/SEEance-test']
    });
    let sourcesNames = core.getDependencies([], {
        pkg: analysisPkg
    });
    let datasources;
    let result;
    await cp.init();
    datasources = await Promise.all(sourcesNames.map((n) => cp.getDatasourceByName(n)));


    const pp = await cp.getPreprocessorByName('testpp');
    console.log(pp);

    result = await core.analyze(process.argv[2], process.argv[3], datasources, [{
        pkg: pp.package,
        module: pp.module,
        config: {}
    }], {
        pkg: analysisPkg,
        module: analysis,
        config: analysisPkg.seeance
    });
    // Solution by stackoverflow user JLeXanDR
    // (https://stackoverflow.com/questions/35995273/how-to-run-html-file-using-node-js)
    console.log("ANALYSIS TEST: Serving analysis output on http://localhost:8080")
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(result);
        response.end();
    }).listen(8080);
}