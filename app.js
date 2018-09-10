const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const rest_service = require('./rest-service');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

function basic_logger(req,res, next) {
  console.log(`${req.method} : ${req.url}`);
  next();
}

app.use(basic_logger);

app.get('/', (req,res) => {
  res.send(`Welcome to the zoo. We have ${config.ANIMALS}`);
}, (e) => {
  res.status(404).send(e);
});

for(animal in config.ANIMALS) {
  let path_to_db = config.DBS[config.ANIMALS[animal]];
  let next_service = rest_service(animal, path_to_db);

  let route = "/" + animal;
  app.use(route,next_service);
}


app.listen(config.PORT, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`Zoo app started on port ${config.PORT}`);
  }
})
