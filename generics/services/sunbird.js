/**
 * name : sunbird.js
 * author : Rakesh Kumar
 * Date : 24-jun-2020
 * Description : All sunbird service related information.
 */

//dependencies

const request = require('request');



/**
  * Call to sunbird service. 
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
    * To get list of learning resources
    * @method
    * @name  learningResources
    * @param {String} token - user access token.
    * @param {String} pageSize - page size of the request
    * @param {String} pageNo - page no of the request
    * @param {String} category - category of the learning resource
    * @param {String} subCategory - subcategory of the learning resource
    * @param {String} topic - topic of the learning resource
    * @param {String} language - language of the learning resource
    * @param {String} sortBy - sortBy option for the learning resource
    * @returns {json} Response consists of list of learning resources
    */

const learningResources = function (token,pageSize,pageNo,category,subCategory,topic,language,sortBy) {
    return new Promise(async (resolve, reject) => {
        try {
            const learningResourceApiUrl = constants.apiEndpoints.GET_RESOURCES_LIST+"?limit="+pageSize+
            "&page="+pageNo+
            "&board="+category+
            "&gradeLevel="+subCategory+
            "&subject="+topic+
            "&medium="+language+
            "&sortBy="+sortBy;

            let response = await callToSunbird("GET", learningResourceApiUrl, token);
            return resolve(JSON.parse(response));
        } catch (error) {
            reject({ message: constants.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
        

    })
}

/**
  * Get filters of learning resources
  * @function
  * @name filtersList
  * @param token - Logged in user token.
  * @returns {JSON} - consist filters list of learning resources
*/
const filtersList = function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const categoryListApiUrl = constants.apiEndpoints.GET_CATEGORY_LIST;
            let response = await callToSunbird("GET", categoryListApiUrl, token);
            return resolve(JSON.parse(response));
        } catch (error) {
           
            reject({ message: constants.apiResponses.SUNBIRD_SERVICE_DOWN });
        }
    })
}


module.exports = {
    learningResources: learningResources,
    filtersList: filtersList
};