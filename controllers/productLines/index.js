const createGenericController = require("../genericController");
const config = require("./../../tables.json");

const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = createGenericController(
  config.product_lines.tableName,
  config.product_lines.requiredFields
);

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
};
