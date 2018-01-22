const { db, DbCollections } = require('../../common');

const getSequence = async (key, defaultVal) => {
  const { value } = await db.findOneAndUpdate(DbCollections.SEQUENCES, { key }, { $inc: { value: 1 } });
  if (!value) {
    await db.insertOne(DbCollections.SEQUENCES, { key, value: defaultVal });
  }
  return value ? value.value : defaultVal;
};

module.exports = {
  getSequence
};
