/** 
* name : helper.js
* author : Rakesh Kumar
* created-date : 24-Jun-2020
* Description : Related to learning resources
*/

const sunbirdService =
  require(ROOT_PATH + "/generics/services/sunbird");

/**
* Learning resource related information be here.
* @method
* @class  LearningResourcesHelper
*/

module.exports = class LearningResourcesHelper {

  /**
  * To get list of learning resources
  * @method
  * @name  all
  * @param {String} token - user access token.
  * @param {String} pageSize - page size of the request
  * @param {String} pageNo - page no of the request
  * @param {String} category - category of the learning resource
  * @param {String} subCategory - subcategory of the learning resource
  * @param {String} topic - topic of the learning resource
  * @param {String} language - language of the learning resource
  * @returns {json} Response consists of list of learning resources
  */
  static all(token, pageSize, pageNo, category, subCategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let popularResources = await this.popular(token, pageSize, pageNo, category, subCategory, topic, language);
        let recentResources = await this.recentlyAdded(token, pageSize, pageNo, category, subCategory, topic, language);
        let allResources = [];
        if (recentResources && recentResources.result) {
          allResources.push(recentResources.result);
        }
        if (popularResources && popularResources.result) {
          allResources.push(popularResources.result);
        }
        resolve({ message: constants.apiResponses.LEARNING_RESORCES_FOUND, result: allResources });

      } catch (error) {
        return reject(error);
      }
    })

  }


  /**
  * To get list of popular learning resources
  * @method
  * @name  list
  * @param {String} token - user access token.
  * @param {String} pageSize - page size of the request
  * @param {String} pageNo - page no of the request
  * @param {String} category - category of the learning resource
  * @param {String} subCategory - subcategory of the learning resource
  * @param {String} topic - topic of the learning resource
  * @param {String} language - language of the learning resource
  * @returns {json} Response consists of list of learning resources
  */
  static popular(token, pageSize, pageNo, category, subcategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = constants.common.POPULAR_FILTER;
        let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, category, subcategory, topic, language, sortBy);
        if (learningResources && learningResources.result && learningResources.result.data) {
          let resourcesData = [];
          learningResources.result.data.map(resources => {

            let data = {};
            if (resources.identifier) {
              data['url'] = process.env.sunbird_url + constants.common.CONTENT_PATH + resources.identifier;
            }
            data['appIcon'] = resources.appIcon;
            data['title'] = resources.name;
            data['description'] = resources.description;
            data['rating'] = resources.me_totalRatings;
            data['time'] = resources.createdOn;
            resourcesData.push(data);
          });
          resolve({
            message: learningResources.message, result: {
              title: 'Most Popular',
              type: 'card',
              description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate 
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              totalCount: learningResources.result.count,
              viewMoreUrl: process.env.sunbird_url + constants.common.RESOURCE_DASHBOARD,
              resources: resourcesData
            }
          });
        } else {
          reject({ status:httpStatusCode.not_found.status, message: constants.apiResponses.LEARNING_RESORCES_NOT_FOUND });
        }
      } catch (error) {
        return reject(error);
      }
    })
  }

  /**
* To get list of recently added learning resources
* @method
* @name  recentlyAdded
 * @param {String} token - user access token.
  * @param {String} pageSize - page size of the request
  * @param {String} pageNo - page no of the request
  * @param {String} category - category of the learning resource
  * @param {String} subCategory - subcategory of the learning resource
  * @param {String} topic - topic of the learning resource
  * @param {String} language - language of the learning resource
* @returns {json} Response consists of list of learning resources
*/
  static recentlyAdded(token, pageSize, pageNo, category, subCategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = constants.common.RECENT_FILTER;
        let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, category, subCategory, topic, language, sortBy);
        if (learningResources && learningResources.result && learningResources.result.data) {
          let resourcesData = [];
          learningResources.result.data.map(resources => {

            let data = {};
            if (resources.identifier) {
              data['url'] = process.env.sunbird_url + constants.common.CONTENT_PATH + resources.identifier;
            }
            data['appIcon'] = resources.appIcon;
            data['title'] = resources.name;
            data['description'] = resources.description;
            data['rating'] = resources.me_totalRatings;
            data['time'] = resources.createdOn;
            resourcesData.push(data);
          });
          resolve({
            message: learningResources.message, result: {
              title: "Recently Added",
              type: "card",
              imageUrl: "",
              description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate 
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
              "viewMoreUrl": process.env.sunbird_url,
              totalCount: learningResources.result.count,
              resources: resourcesData
            }
          });
        } else {
          reject({ status:httpStatusCode.not_found.status, message: constants.apiResponses.LEARNING_RESORCES_NOT_FOUND });
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
        let filters = [];
        if (categoryList) {

          let libraryFilterForm =  await database.models.forms.findOne({ name: constants.common.FILTER_FORM }); 
          categoryList.result.framework.categories.map(function (element) {
            let list = {
              options: []
            };
            element.terms.map(item => {
              list.options.push({ label: item.name, value: item.code });
            });

            let field = "";
            if (element.code == "board") {
              field ="category";
            } else if (element.code == "gradeLevel") {
              field ="subCategory";
            } if (element.code == "subject") {
              field ="topic";
            } else if (element.code == "medium") {
              field ="language";
            }
 
            let inputFieldData = libraryFilterForm.value.filter(item=>{
              if (item.field==field){
                return item;
              }
            });
            inputFieldData[0]['options'] = list.options;
            filters.push(inputFieldData[0]);

          });
          resolve({ message: constants.apiResponses.FILTERS_FOUND, result: filters });
        } else {
          resolve({ status:httpStatusCode.not_found.status, message: constants.apiResponses.FILTERS_NOT_FOUND});
        }
     } catch (error) {
        return reject(error);
      }
    })
  }
}