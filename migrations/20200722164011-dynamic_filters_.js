module.exports = {
  async up(db) {
    global.migrationMsg = "Library fiilter form";

    let inputElements = ["category", "language", "subCategory", "topic"];

    function camelCaseToTitleCase(in_camelCaseString) {
      var result = in_camelCaseString
        .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")
        .trim();
      return result.charAt(0).toUpperCase() + result.slice(1);
    }

    let fields = [];
    inputElements.map(input => {
      let inputElement = {
        "field": input,
        "value": "",
        "visible": true,
        "editable": true,
        "label": camelCaseToTitleCase(input),
        "input": "select",
        "validation": [
        ],
        "options": []
      }
      fields.push(inputElement);

    });

    let createForm = {
      name: "libraryFilterForm",
      value: fields
    }
    await db.collection('forms').insertOne(createForm);

  },

  async down(db) {
  }
};
