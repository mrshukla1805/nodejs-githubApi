const { generateOptions } = require('./utils');
const https = require('https');

const getUser= async function (req, res) {
    const user = req.params.user;
    const options = generateOptions('/users/' + user)
    console.warn(options)

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

const getRepo= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions('/repos/' + user + '/' + reponame) 

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

const getForks =  async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const sortBy = req.query.sort || 'newest';
    const pageNo = req.query.pageNo || 1
    const options = generateOptions('/repos/' + user + '/' + reponame + '/forks',{ sort: sortBy, per_page: 3, page: pageNo }  ) 
    console.warn(options)
    https.get(options, function (apiResponse) {
        if (apiResponse.statusCode >= 300 && apiResponse.statusCode < 400 && apiResponse.headers.location) {
            console.log(`Redirected to: ${apiResponse.headers.location}`);
            const redirectedOptions = generateOptions(apiResponse.headers.location);
            https.get(redirectedOptions, function (redirectedResponse) {
                redirectedResponse.pipe(res);
            });
        } else {
            // Not a redirect: Pipe the response to the client
            apiResponse.pipe(res);
        }
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

const getCommit= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions('/repos/' + user + '/' + reponame + '/commits')

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

module.exports = { getUser, getRepo, getCommit, getForks }