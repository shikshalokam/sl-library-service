/**
 * name : constants/api-responses.js
 * author : Rakesh Kumar
 * Date : 17-June-2020
 * Description : All api response messages.
 */


module.exports = {
    SUNBIRD_SERVICE_DOWN: "Sunbird service is down",
    FILTERS_FOUND: "Filters fetched successfully",
    FILTERS_NOT_FOUND: "Filters not found",
    LEARNING_RESORCES_FOUND: "Learning resources found successfully",
    LEARNING_RESORCES_NOT_FOUND: "Learning resources not found",
    TOKEN_MISSING_CODE: 'ERR_TOKEN_FIELD_MISSING',
    TOKEN_MISSING_MESSAGE: 'Required field token is missing',
    TOKEN_INVALID_CODE: 'ERR_TOKEN_INVALID',
    TOKEN_INVALID_MESSAGE: 'Access denied',
    MISSING_TOKEN_AND_INTERNAL_ACCESS_TOKEN_CODE: "ERR_REQUEST_FIELDS_MISSING",
    MISSING_TOKEN_AND_INTERNAL_ACCESS_TOKEN_MESSAGE: "Token and Internal access token both are required field",
    MISSING_TOKEN_OR_INTERNAL_ACCESS_TOKEN_CODE: "ERR_REQUEST_ANY_ONE_FIELD_MISSING",
    MISSING_TOKEN_OR_INTERNAL_ACCESS_TOKEN_MESSAGE: "Token or Internal access token either one is required"

};
