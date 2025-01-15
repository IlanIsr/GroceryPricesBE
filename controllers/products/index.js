const createGenericController = require("../genericController");
const config = require("./../../tables.json");

const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = createGenericController(
  config.products.tableName,
  config.products.requiredFields
);

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
};
