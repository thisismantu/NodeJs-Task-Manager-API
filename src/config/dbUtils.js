require('dotenv').config();
const getPrefixedTableName = (tableName) => {
    return `${process.env.DB_PREFIX}${tableName}`;
};
module.exports = { getPrefixedTableName };