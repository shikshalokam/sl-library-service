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
  * @name  all
  * @param {String} token - user access token.
  * @param {String} pageSize - page size of the request
  * @param {String} pageNo - page no of the request
  * @returns {json} Response consists of list of learning resources
  */
  static all(token, pageSize, pageNo, category, subcategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let popularResources = await this.popular(token, pageSize, pageNo, category, subcategory, topic, language);
        let recentResources = await this.recent(token, pageSize, pageNo, category, subcategory, topic, language);

        let allResources = [];
        if (recentResources.result) {
          allResources.push(recentResources.result);
        }

        if (popularResources.result) {
          allResources.push(popularResources.result);
        }

        resolve({ message: "Learning resources fetched successfully", result: allResources });

      } catch (error) {
        return reject(error);
      }
    })

  }


  /**
  * To get list of laerning resources
  * @method
  * @name  list
  * @param {String} token - user access token.
  * @param {String} pageSize - page size of the request
  * @param {String} pageNo - page no of the request
  * @param {String} category- category of the resources
  * @returns {json} Response consists of list of learning resources
  */
  static popular(token, pageSize, pageNo, category, subcategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = "popular";
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
              description: 'Most popular',
              totalCount: learningResources.result.count,
              viewMoreUrl: process.env.sunbird_url,
              resources: resourcesData
            }
          });
        } else {
          resolve(learningResources);
        }
      } catch (error) {
        return reject(error);
      }
    })
  }

  /**
* To get list of laerning resources
* @method
* @name  recent
* @param {String} token - user access token.
* @param {String} pageSize - page size of the request
* @param {String} pageNo - page no of the request
* @returns {json} Response consists of list of learning resources
*/
  static recent(token, pageSize, pageNo, category, subcategory, topic, language) {
    return new Promise(async (resolve, reject) => {
      try {

        let sortBy = "recent";
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
            // data['redirect_url'] = '';
            data['rating'] = resources.me_totalRatings;
            data['time'] = resources.createdOn;
            resourcesData.push(data);
          });
          resolve({
            message: learningResources.message, result: {
              title: "Recently Added",
              type: "card",
              imageUrl: "",
              description: "Recently added",
              "viewMoreUrl": process.env.sunbird_url,
              totalCount: learningResources.result.count,
              resources: resourcesData
            }
          });
        } else {
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
        let filters = [];
        categoryList.result.framework.categories.map(function (element) {
          let list = {
            options: []
          };
          element.terms.map(item => {
            list.options.push({ label: item.name, value: item.code });
          });

          list['visible'] = true;
          if (element.code == "board") {

            list['label'] = "Category";
            list['inputType'] = "select";
            list['placeholder'] = "Select Category";
            list['field'] = "category";

          } else if (element.code == "gradeLevel") {

            list['label'] = "Sub category";
            list['inputType'] = "select";
            list['placeholder'] = "Select Sub Category";
            list['field'] = "Subcategory";

          } if (element.code == "subject") {

            list['label'] = "Topic";
            list['inputType'] = "select";
            list['placeholder'] = "Select Topic";
            list['field'] = "topic";

          } else if (element.code == "medium") {

            list['label'] = "Language";
            list['inputType'] = "select";
            list['placeholder'] = "Select Language";
            list['field'] = "language";

          }
          filters.push(list)

        });

        resolve({ message: constants.apiResponses.FILTERS_FOUND, result: filters });

      } catch (error) {
        return reject(error);
      }
    })
  }
}