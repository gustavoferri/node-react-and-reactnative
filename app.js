const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/dm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: conexão com mongoDB não realizada com sucesso!" + '</br>' + erro);
});


app.get("/usuarios", (req, res) => {
    res.send('Olá, Gustavo!');
  });

  app.post("usuarios", (req, res) => {
    res.send("Cadastrar");
  });

app.listen(3000, () => {
    console.log('Example app listening on port 3000! http://localhost:3000');
  });