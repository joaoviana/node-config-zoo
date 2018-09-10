const model_factory = require('./model');
const controller_factory = require('./controller');
const routes_factory = require('./routes');

module.exports = (model_name, db_path) => {
  let model = model_factory(model_name, db_path);
  let controller = controller_factory(model);
  let rest_service = routes_factory(controller);
  return rest_service;
}
