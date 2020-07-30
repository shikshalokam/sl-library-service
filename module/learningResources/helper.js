/** 
* name : helper.js
* author : Rakesh Kumar
* created-date : 24-Jun-2020
* Description : Related to learning resources
*/

const sunbirdService =
  require(GENERIC_SERVICES_PATH + "/sunbird");

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
  * @param {String} category - categories for the learning resource
  * @param {String} subCategory - subcategories for the learning resource
  * @param {String} topic - topic's for the learning resource
  * @param {String} language - language's of the learning resource
  * @returns {json} Response consists of list of learning resources
  */
  static all(token, pageSize, pageNo, category, subCategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let popularResources = await this.popular(token, pageSize, pageNo, category, subCategory, topic, language);
        let recentResources = await this.recentlyAdded(token, pageSize, pageNo, category, subCategory, topic, language);
        let allResources = [];
        if (recentResources && recentResources.data) {
          allResources.push(recentResources.data);
        }
        if (popularResources && popularResources.data) {
          allResources.push(popularResources.data);
        }
        if (allResources && allResources.length > 0) {
          resolve({
            message: CONSTANTS.apiResponses.LEARNING_RESORCES_FOUND,
            data: allResources,
            success: true
          });
        } else {
          resolve({
            message: popularResources.message,
            data: false,
            success: true
          });
        }


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
  * @param {String} category - categories for the learning resource
  * @param {String} subCategory - subcategories for the learning resource
  * @param {String} topic - topic's for the learning resource
  * @param {String} language - language's of the learning resource
  * @returns {json} Response consists of list of learning resources
  */
  static popular(token, pageSize, pageNo, category, subcategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = CONSTANTS.common.POPULAR_FILTER;
        let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, category, subcategory, topic, language, sortBy);
        if (learningResources && learningResources.result && learningResources.result.content) {
          let resourcesData = [];

          learningResources.result.content.map(resources => {

            let data = {};
            if (resources.identifier) {
              data['url'] = process.env.SUNBIRD_URL + CONSTANTS.common.CONTENT_PATH + resources.identifier;
            }
            data['appIcon'] = resources.appIcon;
            data['title'] = resources.name;
            data['description'] = resources.description;
            data['rating'] = resources.me_totalRatings;
            data['time'] = resources.createdOn;
            resourcesData.push(data);
          });
          resolve({
            message: learningResources.message,
            data: {
              title: 'Most Popular',
              type: 'card',
              description: ``,
              totalCount: learningResources.result.count,
              viewMoreUrl: process.env.SUNBIRD_URL + CONSTANTS.common.RESOURCE_DASHBOARD,
              resources: resourcesData
            },
            success: true
          });
        } else {
          resolve({
            message: CONSTANTS.apiResponses.LEARNING_RESORCES_NOT_FOUND,
            success: false,
            data: false
          });
        }
      } catch (error) {
        resolve({
          message: error.message,
          data: false,
          success: false
        });
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
  * @param {String} category - categories for the learning resource
  * @param {String} subCategory - subcategories for the learning resource
  * @param {String} topic - topic's for the learning resource
  * @param {String} language - language's of the learning resources
* @returns {json} Response consists of list of learning resources
*/
  static recentlyAdded(token, pageSize, pageNo, category, subCategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = CONSTANTS.common.RECENT_FILTER;
        let learningResources = await sunbirdService.learningResources(token, pageSize, pageNo, category, subCategory, topic, language, sortBy);
        if (learningResources && learningResources.result && learningResources.result.content) {
          let resourcesData = [];
          learningResources.result.content.map(resources => {

            let data = {};
            if (resources.identifier) {
              data['url'] = process.env.SUNBIRD_URL + CONSTANTS.common.CONTENT_PATH + resources.identifier;
            }
            data['appIcon'] = resources.appIcon;
            data['title'] = resources.name;
            data['description'] = resources.description;
            data['rating'] = resources.me_totalRatings;
            data['time'] = resources.createdOn;
            resourcesData.push(data);
          });
          resolve({
            message: learningResources.message,
            data: {
              title: "Recently Added",
              type: "card",
              imageUrl: "",
              description: ``,
              "viewMoreUrl": process.env.SUNBIRD_URL + CONSTANTS.common.RESOURCE_DASHBOARD,
              totalCount: learningResources.result.count,
              resources: resourcesData
            },
            success: true
          });
        } else {
          resolve({
            message: CONSTANTS.apiResponses.LEARNING_RESORCES_NOT_FOUND,
            data: false,
            success: false
          });
        }
      } catch (error) {
        resolve({
          message: error.message,
          data: false,
          success: false
        });
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


          let libraryFilterForm = await database.models.forms.findOne({ name: CONSTANTS.common.FILTER_FORM });
          categoryList.result.map(function (element) {
            let list = {
              options: []
            };
            element.terms.map(item => {
              list.options.push({ label: item.name, value: item.code });
            });

            let field = "";
            if (element.code == "board") {
              field = "category";
            } else if (element.code == "gradeLevel") {
              field = "subCategory";
            } if (element.code == "subject") {
              field = "topic";
            } else if (element.code == "medium") {
              field = "language";
            }

            let inputFieldData = libraryFilterForm.value.filter(item => {
              if (item.field == field) {
                return item;
              }
            });
            inputFieldData[0]['options'] = list.options;
            filters.push(inputFieldData[0]);

          });
          resolve({
            message: CONSTANTS.apiResponses.FILTERS_FOUND,
            data: filters,
            success: true
          });
        } else {
          resolve({
            message: CONSTANTS.apiResponses.FILTERS_NOT_FOUND,
            data: false,
            success: false
          });
        }
      } catch (error) {
        resolve({
          message: error.message,
          data: false,
          success: false
        });
      }
    })
  }
}