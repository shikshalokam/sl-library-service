/**
 * name : sunbird.js
 * author : Rakesh Kumar
 * Date : 28-July-2020
 * Description :  Sunbird services.
 */

// Dependencies 

const request = require("request");
var verifyToken = function (token) {

    let options = {
        "headers": {
            "content-type": "application/json",
            "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN,
        },
        json: {
            token: token
        }
    };

    return new Promise(function (resolve, reject) {
        try {
            request.post(process.env.SUNBIRD_SERIVCE_HOST + process.env.SUNBIRD_SERIVCE_BASE_URL + "api/v1/token/verify", options, callback);
            function callback(err, data) {
                if (err) {
                    return reject({
                        message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN
                    });
                } else {
                    return resolve(data.body);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    verifyToken: verifyToken
};
