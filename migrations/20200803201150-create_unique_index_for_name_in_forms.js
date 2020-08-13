module.exports = {
  async up(db) {
    global.migrationMsg = "set forms name as unique index"
    
    db.collection('forms').createIndex(
      { name: 1 },
      { unique : true });

  },

  async down(db) {
    // return await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
