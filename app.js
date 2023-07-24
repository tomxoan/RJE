const csv = require('csvtojson');
const vd = require('./validation/validators');
const vdm = require('./validation/validationMaps');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Using express module
const express = require('express');
const fs = require('fs');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(req.path);
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error loading the HTML file.');
      return;
    }

    res.status(200).send(data);
  });
});

app.get('/validate', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  csv()
    .fromFile('./equipment_list.csv')
    .then(async (jsonArray) => {
      let errors = [];

      await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);

      res.end(JSON.stringify(errors));
      console.log('Endpoint reached.');
    });
});

app.get('/api/validate/:id', (req, res) => {
  csv()
    .fromFile('./equipment_list.csv')
    .then(async (jsonArray) => {
      let errors = [];

      await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);
      const rowId = req.params.id;
      
      res.end(JSON.stringify(errors.filter((error) => error.line == rowId)));
      console.log('Endpoint reached.');
    });
  
  // res.json({ message: `User with ID ${userId} found!` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
