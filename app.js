const express = require('express');
const cors = require('cors');
const fs = require('fs');


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const dataPath = './data.json';

app.get('/', (req, res) => {
  res.send('Server is running!');
})

app.get('/datas', (req, res) => {

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get('/datas/:id', (req, res) => {
  const itemId = req.params.id;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === itemId);
      if (item) {
        res.json(item);
      } else {
        res.status(404).send('Item não encontrado.');
      }
    }
  });
});

app.post('/datas', (req, res) => {
  const newItem = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      const items = JSON.parse(data);
      items.push(newItem);
      fs.writeFile(dataPath, JSON.stringify(items), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erro ao gravar o arquivo de dados.');
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

app.put('/datas/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      let items = JSON.parse(data);
      const itemIndex = items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        fs.writeFile(dataPath, JSON.stringify(items), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erro ao gravar o arquivo de dados.');
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        res.status(404).send('Item não encontrado.');
      }
    }
  });
});


app.patch('/datas/:id/data/:newData', (req, res) => {
  const itemId = req.params.id;
  const newData = req.params.newData;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      let items = JSON.parse(data);
      const itemToUpdate = items.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.data = newData;
        fs.writeFile(dataPath, JSON.stringify(items), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erro ao gravar o arquivo de dados.');
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        res.status(404).send('Item não encontrado.');
      }
    }
  });
});

app.get('/datas/check/:date', (req, res) => {
  const dateToCheck = req.params.date;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      const items = JSON.parse(data);
      const foundItem = items.some((item) => item.data === dateToCheck);
      res.json(foundItem);
    }
  });
});

app.delete('/datas/:id', (req, res) => {
  const itemId = req.params.id;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo de dados.');
    } else {
      let items = JSON.parse(data);
      const updatedItems = items.filter((item) => item.id !== itemId);
      if (items.length !== updatedItems.length) {
        fs.writeFile(dataPath, JSON.stringify(updatedItems), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erro ao gravar o arquivo de dados.');
          } else {
            res.sendStatus(204);
          }
        });
      } else {
        res.status(404).send('Item não encontrado.');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})