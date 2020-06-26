/**
 * name : sunbird.js
 * author : Rakesh Kumar
 * Date : 24-jun-2020
 * Description : All sunbird service related information.
 */

//dependencies

const request = require('request');


/**
  * Call to sunbird api's. 
  * @function
  * @name callToSunbird
  * @param requestBody - Logged in user Id.
  * @param token - Logged in user token.
  * @param url - url of the api call.
  * @param requestType - http request method
  * @returns {JSON} - sunbird service response
*/

function callToSunbird(requestType, url, token, requestBody = "") {
    return new Promise(async (resolve, reject) => {

        let options = {
            "headers": {
                "content-type": "application/json",
                "authorization": process.env.AUTHORIZATION,
                "x-authenticated-user-token": token
            }
        };

        if (requestType != "GET") {
            options['json'] = { request: requestBody };
        }

        url = process.env.SUNBIRD_SERIVCE_HOST + process.env.SUNBIRD_SERIVCE_BASE_URL + process.env.URL_PREFIX + url;
        if (requestType == "PATCH") {
            request.patch(url, options, callback);
        } else if (requestType == "GET") {
            request.get(url, options, callback);
        } else {
            request.post(url, options, callback);
        }

        function callback(err, data) {
            if (err) {
                return reject({
                    message: constants.apiResponses.SUNBIRD_SERVICE_DOWN
                });
            } else {
                return resolve(data.body);
            }
        }

    });
}


/**
  * Get learning resources.
  * @function
  * @name learningResources
  * @param token - Logged in user token.
  * @returns {JSON} - consist of learning resources list
*/

const learningResources = function (token,pageSize,pageNo) {
    return new Promise(async (resolve, reject) => {
        try {
            const learningResourceApiUrl = constants.apiEndpoints.GET_RESOURCES_LIST+"?limit="+pageSize+"&page="+pageNo;
            let response = await callToSunbird("GET", learningResourceApiUrl, token);
            return resolve(JSON.parse(response));
        } catch (error) {
            reject(error)
        }
        

    })
}

const filtersList = function (token,pageSize,pageNo) {
    return new Promise(async (resolve, reject) => {
        try {
            const categoryListApiUrl = constants.apiEndpoints.GET_CATEGORY_LIST;
            let response = await callToSunbird("GET", categoryListApiUrl, token);
            return resolve(JSON.parse(response));
        } catch (error) {
            reject(error)
        }
        

    })
}


module.exports = {
    learningResources: learningResources,
    filtersList: filtersList
};