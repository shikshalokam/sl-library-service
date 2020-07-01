/**
 * name : learningResources.js
 * author : Rakesh Kumar
 * created-date : 24-Jun-2020
 * Description : related to learning resources
 */

const learningResourceshelper = require(MODULES_BASE_PATH + "/learningResources/helper.js");

/**
   * LearningResources
   * @class
*/
module.exports = class learningResources {

  static get name() {
    return "learningResources";
  }

  /**
  * @api {get} /library-service/api/v1/learningResources/list?limit=10&page=1  
  * To get list of learning resources
  * @apiVersion 1.0.0
  * @apiGroup Learning Resources
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /library-service/api/v1/learningResources/list?limit=10&page=1 
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  {
    "message": "Learning resources found successfully",
    "status": 200,
    "result": {
        "data": [
            {
                "ownershipType": [
                    "createdBy"
                ],
                "live_link_start": "01:00",
                "previewUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/ecml/do_2127561039911895041422-latest",
                "channel": "0127053482034872320",
                "downloadUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/ecar_files/do_2127561039911895041422/aws-10000-foot-overview-2019-course_1557205419155_do_2127561039911895041422_2.0.ecar",
                "organisation": [
                    "camino"
                ],
                "language": [
                    "English"
                ],
                "mimeType": "application/vnd.ekstep.ecml-archive",
                "variants": {
                    "spine": {
                        "ecarUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/ecar_files/do_2127561039911895041422/aws-10000-foot-overview-2019-course_1557205419295_do_2127561039911895041422_2.0_spine.ecar",
                        "size": 1319
                    }
                },
                "editorState": "{\"plugin\":{\"noOfExtPlugins\":14,\"extPlugins\":[{\"plugin\":\"org.ekstep.contenteditorfunctions\",\"version\":\"1.2\"},{\"plugin\":\"org.ekstep.keyboardshortcuts\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.richtext\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.iterator\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.navigation\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.mathtext\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.libs.ckeditor\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.keyboard\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.mcq\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.mtf\",\"version\":\"1.1\"},{\"plugin\":\"org.ekstep.questionunit.reorder\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.questionunit.sequence\",\"version\":\"1.0\"},{\"plugin\":\"org.ekstep.questionunit.ftb\",\"version\":\"1.0\"}]},\"stage\":{\"noOfStages\":1,\"currentStage\":\"e8595648-6453-43c1-a6da-c992e0959833\"},\"sidebar\":{\"selectedMenu\":\"settings\"}}",
                "objectType": "Content",
                "collections": [],
                "live_link_end": "02:00",
                "appId": "dev.camino.portal",
                "contentEncoding": "gzip",
                "artifactUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/do_2127561039911895041422/artifact/1557205419022_do_2127561039911895041422.zip",
                "lockKey": "7c86b955-b12c-4bcd-93ff-efa47b5078bb",
                "contentType": "Resource",
                "identifier": "do_2127561039911895041422",
                "lastUpdatedBy": "1c4c01a5-36fe-45bb-8f96-0f7db8940883",
                "audience": [
                    "Learner"
                ],
                "visibility": "Default",
                "consumerId": "83f22748-0d37-4bfc-b401-1fc88dedb178",
                "mediaType": "content",
                "osId": "org.ekstep.quiz.app",
                "graph_id": "domain",
                "nodeType": "DATA_NODE",
                "lastPublishedBy": "e7281c98-1eb0-4774-8dd9-a6100f05870a",
                "prevState": "Review",
                "size": 5410,
                "lastPublishedOn": "2019-05-07T05:03:39.155+0000",
                "IL_FUNC_OBJECT_TYPE": "Content",
                "name": " AWS - 10,000 Foot Overview (2019 course)",
                "status": "Live",
                "totalQuestions": 0,
                "code": "org.sunbird.ZwoPJB",
                "description": "Enter description for Resource",
                "streamingUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/content/ecml/do_2127561039911895041422-latest",
                "idealScreenSize": "normal",
                "createdOn": "2019-05-06T11:20:00.486+0000",
                "live_link": "https://www.youtube.com/watch?v=3Z_WylQ06QI",
                "duration": "1",
                "contentDisposition": "inline",
                "lastUpdatedOn": "2019-05-07T05:03:37.806+0000",
                "SYS_INTERNAL_LAST_UPDATED_ON": "2019-05-07T05:03:39.780+0000",
                "dialcodeRequired": "No",
                "owner": "Williams Lee",
                "creator": "Williams Lee",
                "createdFor": [
                    "0127053482034872320"
                ],
                "IL_SYS_NODE_TYPE": "DATA_NODE",
                "os": [
                    "All"
                ],
                "totalScore": 0,
                "pkgVersion": 2,
                "versionKey": "1557205418230",
                "idealScreenDensity": "hdpi",
                "framework": "niit_tv",
                "s3Key": "ecar_files/do_2127561039911895041422/aws-10000-foot-overview-2019-course_1557205419155_do_2127561039911895041422_2.0.ecar",
                "lastSubmittedOn": "2019-05-07T05:06:42.956+0000",
                "createdBy": "1c4c01a5-36fe-45bb-8f96-0f7db8940883",
                "compatibilityLevel": 2,
                "activityType": "live Session",
                "IL_UNIQUE_ID": "do_2127561039911895041422",
                "ownedBy": "1c4c01a5-36fe-45bb-8f96-0f7db8940883",
                "resourceType": "Learn",
                "node_id": 444167
            }
        ],
        "count": 4932
    }
}
  **/

  /**
   * To get list of resources
   * @method
   * @name list
   * @param  {req}  - requested data.
   * @returns {json} Response consists list of learning resource
  */

  all(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let response = await learningResourceshelper.all(
          req.userDetails.userToken,
          req.pageSize,
          req.pageNo,
          req.query.Category ? req.query.Category : "",
          req.query.Subcategory ? req.query.Subcategory : "",
          req.query.Topic ? req.query.Topic : "",
          req.query.Language ? req.query.Language : "" 
          );


        return resolve(response);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }

    /**
  * @api {get} /library-service/api/v1/learningResources/filtersList 
  * To get filters list of learning resources
  * @apiVersion 1.0.0
  * @apiGroup Learning Resources
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /library-service/api/v1/learningResources/filtersList
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
    {
    "message":"filters featched successfully",
    "status": 200,
      "result": {
         "medium": [
            {
                "label": "English",
                "value": "english"
            },
            {
                "label": "Hindi",
                "value": "hindi"
            },
            {
                "label": "Odia",
                "value": "oriya"
            },
            {
                "label": "Telugu",
                "value": "telugu"
            },
            {
                "label": "Kannada",
                "value": "kannada"
            },
            {
                "label": "Marathi",
                "value": "marathi"
            },
            {
                "label": "Assamese",
                "value": "assamese"
            },
            {
                "label": "Bengali",
                "value": "bengali"
            },
            {
                "label": "Gujarati",
                "value": "gujarati"
            },
            {
                "label": "Tamil",
                "value": "tamil"
            },
            {
                "label": "Urdu",
                "value": "urdu"
            },
            {
                "label": "Other",
                "value": "other"
            }
        ]
      }
    }
  **/

  /**
   * To get filters list
   * @method
   * @name filtersList
   * @param  {req}  - requested data.
   * @returns {json} Response consists list of learning resource
  */

  filtersList(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let response = await learningResourceshelper.filtersList(req.userDetails.userToken);
        return resolve(response);

      } catch (error) {

        return reject({
          status:
            error.status ||
            httpStatusCode["internal_server_error"].status,

          message:
            error.message ||
            httpStatusCode["internal_server_error"].message
        });
      }
    });
  }
}