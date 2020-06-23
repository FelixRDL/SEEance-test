const {Octokit} = require("@octokit/rest");
const _ = require("lodash");

module.exports = async function(owner, repo, token=undefined) {
    var x = [4, 8, 15, 16, 23, 42];
    var y = [42, 23, 16, 15, 8, 4];
    y = _.sortBy(y, [function(o) {return o}])
    return Promise.resolve({
        x: x,
        y: y
    });
}