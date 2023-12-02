const constants=require('./constants');
require('dotenv').config();


const generateOptions=(_path, queryParams = {})=>{
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
    const fullPath = queryString ? `${_path}?${queryString}` : _path;
    return options = {
        hostname: constants.hostname,
        path: fullPath,
        headers: {
            'User-Agent': constants.user_agent
        },
        Authorization: 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN
    }
}

module.exports ={ generateOptions }