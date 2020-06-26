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
    static list(token,pageSize,pageNo) {
        return new Promise(async (resolve, reject) => {
            try {
                let learningResources = await sunbirdService.learningResources(token,pageSize,pageNo);
                resolve(learningResources);

            } catch (error) {
                return reject(error);
            }
        })

    }

    /**
    * To get list of category
    * @method
    * @name  categoryList
    * @param {String} token - user access token.
    * @returns {json} Response consists of list of learning resources
    */
   static filtersList(token,pageSize,pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let categoryList = await sunbirdService.filtersList(token,pageSize,pageNo);
                let typeList = { };

                categoryList.result.framework.categories.map(function(element){
                    let list = [];
                    element.terms.map(item=>{
                        list.push({ label:item.name,value:item.code });
                    });
                    typeList[element.code] = list;
                });                
                resolve({ result: typeList });

            } catch (error) {
                return reject(error);
            }
        })
    }
}