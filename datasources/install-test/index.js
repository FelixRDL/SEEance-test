const {Octokit} = require("@octokit/rest");
const _ = require("lodash");
const joke = require('give-me-a-joke');

module.exports = async function(owner, repo, token=undefined) {
    return new Promise(async (resolve, reject) => {
        var x = [4, 8, 15, 16, 23, 42];
        var y = [42, 23, 16, 15, 8, 4];
        y = _.sortBy(y, [function(o) {return o}])
        joke.getRandomCNJoke(j => {
            resolve({
                x: x,
                y: y,
                joke: j
            });
        }, err => {
            reject(err);
        });
    });
}