/**
 * name : kendra.js
 * author : Rakesh Kumar
 * Date : 03-Nov-2020
 * Description : All kendra service related api call.
 */

//dependencies

const kendraServiceUrl =
    process.env.KENDRA_SERIVCE_HOST +
    process.env.KENDRA_SERIVCE_BASE_URL +
    process.env.URL_PREFIX;

const request = require('request');
const fs = require('fs');

/**
* To get list of learning resources
* @method
* @name  learningResources
* @param {String} token - user access token.
* @param {String} pageSize - page size of the request
* @param {String} pageNo - page no of the request
* @param {String} category - category for the learning resource
* @param {String} subCategory - subcategory for the learning resource
* @param {String} topic -  topic for the learning resource
* @param {String} language - language for the learning resource
* @param {String} sortBy - sortBy option for the learning resource
* @returns {json} Response consists of list of learning resources
*/

const learningResources = function (token, pageSize, pageNo, filters, sortBy) {
    return new Promise(async (resolve, reject) => {
        try {

            let learningResourceApiUrl = CONSTANTS.endpoints.GET_RESOURCES_LIST
            learningResourceApiUrl = learningResourceApiUrl + "?limit=" + pageSize + "&page=" + pageNo + "&sortBy=" + sortBy;
            let mappedFilterList = {};
            let filterKeys = Object.keys(filters);
            
            if (filterKeys && filterKeys.length > 0) {
                filterKeys.map(filter => {
                    let mappingType = "";
                   
                    if (filter == "category") {
                        mappingType = "board"
                    } else if (filter == "subCategory") {
                        mappingType = "gradeLevel"
                    } else if (filter == "topic") {
                        mappingType = "medium"
                    } else if (filter == "language") {
                        mappingType = "subject"
                    }
                    mappedFilterList[mappingType] = filters[filter];
                });
            }

            let requestBody = {
                filters: mappedFilterList
            }
           
            
            let response = await httpCall("POST", learningResourceApiUrl, token, requestBody);
            return resolve(response);
        } catch (error) {
            reject({ message: CONSTANTS.apiResponses.SUNBIRD_SERVICE_DOWN });
        }


    })
}




/**
* Common http request call 
* @name httpCall
* @param {String} url api endpoint
* @param {String} token user access token
* @param {Json} formData form data of the request
* @returns {Json} - consists of api response body
*/
function httpCall(requestType, url, token="", requestBody = "") {
    return new Promise(async (resolve, reject) => {

        let options = {
            "headers": {
                "content-type": "application/json",
                "internal-access-token":process.env.INTERNAL_ACCESS_TOKEN
            }
        };
        if(token){
            options['headers']["x-authenticated-user-token"] = token;
        }

        if (requestType != "GET") {
            options['json'] = requestBody;
        }
        url = kendraServiceUrl + url;

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
                    message: CONSTANTS.apiResponses.KENDRA_SERVICE_DOWN
                });
            } else {
                return resolve(data.body);
            }
        }

    });
}
module.exports = {
    learningResources: learningResources
};