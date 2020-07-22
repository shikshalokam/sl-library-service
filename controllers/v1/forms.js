/**
 * name : forms.js
 * author : Rakesh Kumar
 * created-date : 21-July-2020
 * Description : Forms information. 
 */


/**
   * Forms
   * @class
*/
module.exports = class Forms extends Abstract {
    constructor() {
      super(schemas["forms"]);
    }
  
    static get name() {
      return "forms";
    }
  
  };
  