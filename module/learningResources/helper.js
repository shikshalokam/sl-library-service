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
    static list(token,pageSize,pageNo,category,subcategory,topic,language) {
        return new Promise(async (resolve, reject) => {
            try {

                let learningResources = await sunbirdService.learningResources(token,pageSize,pageNo,category,subcategory,topic,language);
                
                if(learningResources && learningResources.result && learningResources.result.data){
                    let resourcesData = [];
                    learningResources.result.data.map(resources=>{
                         if(resources.identifier){
                            resources['url']=  process.env.sunbird_url+constants.common.CONTENT_PATH+resources.identifier;
                        }
                        resourcesData.push(resources);
                    });
                    resolve({ message : learningResources.message, result: resourcesData });
                }else{
                    resolve(learningResources);
                }
                

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

                    if(element.code=="board"){
                        typeList["Category"] = list;
                    }else if(element.code=="gradeLevel"){
                        typeList["Subcategory"] = list;
                    } if(element.code=="subject"){
                        typeList["Topic"] = list;
                    }else if(element.code=="medium"){
                        typeList["Language"] = list;
                    }
                    
                });                
                resolve({ message:constants.apiResponses.FILTERS_FOUND, result: typeList });

            } catch (error) {
                return reject(error);
            }
        })
    }
}