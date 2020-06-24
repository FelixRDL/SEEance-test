module.exports =  async function(input, config) {
    return new Promise(async (resolve, reject) => {
        var result = input;
        result['install-test'].joke = input['install-test'].joke.replace("Chuck Norris", "Queen Elizabeth II.");
        resolve(input);
    });
}