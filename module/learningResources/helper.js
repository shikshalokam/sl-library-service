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
* @class  LearningResourcesHelper
*/

module.exports = class LearningResourcesHelper {

    /**
    * To get list of laerning resources
    * @method
    * @name  list
    * @param {String} token - user access token.
    * @param {String} pageSize - page size of the request
    * @param {String} pageNo - page no of the request
    * @returns {json} Response consists of list of learning resources
    */
    static list(token,pageSize,pageNo,board,gradeLevel,subject,medium) {
        return new Promise(async (resolve, reject) => {
            try {

                let learningResources = await sunbirdService.learningResources(token,pageSize,pageNo,board,gradeLevel,subject,medium);
                resolve(learningResources);

            } catch (error) {
                return reject(error);
            }
        })

    }

    /**
    * To get list of filters
    * @method
    * @name  filtersList
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of learning resources
    */
   static filtersList(token) {
        return new Promise(async (resolve, reject) => {
            try {

                let categoryList = await sunbirdService.filtersList(token);
                let typeList = { };

                categoryList.result.framework.categories.map(function(element){
                    let list = [];
                    element.terms.map(item=>{
                        list.push({ label:item.name,value:item.code });
                    });
                    typeList[element.code] = list;
                });                
                resolve({ message:constants.apiResponses.FILTERS_FOUND, result: typeList });

            } catch (error) {
                return reject(error);
            }
        })
    }
}