const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;

let containers = [
  {
    id: 1, name: 'refrigerator', type: 'S', isLoaded: false,
  },
  {
    id: 2,
    name: 'standard',
    type: 'S',
    isLoaded: true,
  },
  {
    id: 3,
    name: 'refrigerator',
    type: 'M',
    isLoaded: false,
  },
  {
    id: 4,
    name: 'standard',
    type: 'M',
    isLoaded: true,
  },
  {
    id: 5,
    name: 'refrigerator',
    type: 'L',
    isLoaded: false,
  },
  {
    id: 6,
    name: 'standard',
    type: 'L',
    isLoaded: true,
  },
];

// Middleware
app.use(morgan('dev'));
app.use(cors()); // to fix cors error

// Routes

app.get('/', (req, resp) => {
  resp.send('Hello Containers!');
});

// GET - /api/containers - grazinti visus konteinerius
app.get('/api/containers', (req, resp) => {
  resp.json(containers);
});

// GET - /api/containers/loaded - grazins visus pakrautus konteinerius
// app.get
// filtruojam containers, kad atrinkti pakrautus
// grazinam pakrautus konteinerius

// GET - /api/containers/name - grazins visus konteinerius pagal "name" masyvo pavidalu
app.get('/api/containers/name', (req, resp) => {
  const namesArr = containers.map((containerObj) => containerObj.name);
  console.log('namesArr ===', namesArr);
  resp.json(namesArr);
});

// GET - /api/containers/type - grazins visus konteinerius pagal "type" masyvo pavidalu
app.get('/api/containers/type', (req, resp) => {
  const typesArr = containers.map((containerObj) => containerObj.type);
  console.log('typesArr ===', typesArr);
  resp.json(typesArr);
});

// GET - /api/containers/1 - grazinti konkretu konteineri
// :containerId - dinamine dalis
app.get('/api/containers/:containerId', (req, resp) => {
  console.log('req.params ===', req.params);
  const containerId = +req.params.containerId;
  // surasti objekta su id === userId ir ji grazinti
  const found = containers.find(
    (containerObj) => containerId === containerObj.id,
  );
  console.log('found ===', found);

  // jei neradom
  if (found === undefined) {
    resp
      .status(404)
      .json({ msg: `container with id ${containerId} was not found` });
    return;
  }
  resp.json(found);
});

// DELETE - /api/containers/1 - istrinti konteineri su id
app.delete('/api/containers/:containerId', (req, resp) => {
  const containerId = +req.params.containerId;
  // grazinti viska isskyrus ta elementa, kurio id yra = container Id
  containers = containers.filter(
    (containerObj) => containerObj.id !== containerId,
  );
  console.log('containers ===', containers);
  resp.json(containers);
});

app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
