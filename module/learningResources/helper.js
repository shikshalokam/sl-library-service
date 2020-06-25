/** 
* name : helper.js
* author : Rakesh Kumar
* created-date : 24-Jun-2020
* Description : related to learning resources
*/


let sunbirdService =
    require(ROOT_PATH + "/generics/services/sunbird");

/**
* learning resource related information be here.
* @method
* @class  learningResourcesHelper
*/

module.exports = class learningResourcesHelper {

    /**
    * To get list of laerning resources
    * @method
    * @name  list
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of learning resources
    */
    static list(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let learningResources = await sunbirdService.learningResources(token);
                resolve(learningResources);

            } catch (error) {
                return reject(error);
            }
        })

    }

}