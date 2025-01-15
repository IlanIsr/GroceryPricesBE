const createGenericController = require("../genericController");
const config = require("./../../tables.json");

const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = createGenericController(
  config.supermarkets.tableName,
  config.supermarkets.requiredFields
);

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
};
