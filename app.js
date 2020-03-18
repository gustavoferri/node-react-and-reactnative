const express = require('express');
const mongoose = require('mongoose');

require('./models/Usuarios');
const Usuarios = mongoose.model('usuarios');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/dm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: conexão com mongoDB não realizada com sucesso!" + erro);
});


app.get("/usuarios", (req, res) => {
    Usuarios.find({}).then((usuarios) => {
      return res.json(usuarios);
    }).catch((err) => {
      return res.status(400).json({
        error: true,
        message: "Nenhum usuário encontrado!"
      });
    });
  });

  app.get("/usuarios/:id", (req, res) => {
  Usuarios.findOne({ _id: req.params.id}).then((usuario) => {
    return res.json(usuario);
  }).catch((err) => {
    return res.status(400).json({
      error: true.value,
      message: "Nenhum usuário encontrado!"
    });
  });
});

  app.post("/usuarios", (req, res) => {
    var usuario = req.body;
    Usuarios.create(req.body, (err) => {
      if(err) return res.status(400).json({
        error: true,
        message: "Erro: Usuário não cadastrado com sucesso!"
      })

      return res.json({
         error: false,
         message: "Usuário cadastrado com sucesso!"
      })
   });
});

app.put("/usuarios/:id", (req, res) => {
  Usuarios.updateOne({ _id: req.params.id}, req.body, (err) => {
      if(err) return res.status(400).json({
          error: true,
          message: "Erro: Usuario não editado com sucesso!"
        });

        return res.json({
          error: false,
          message: "Usuário editado com sucesso!"
        });
    });
});

app.delete("/usuarios/:id", (req, res) => {
  Usuarios.deleteOne({_id: req.params.id}, (err) => {
    if(err) return res.status(400).json({
      error:true,
      message:"Erro: usuário não apagado!"
    });

    return res.json({
      error: false,
      message: "Usuário apagado com sucesso!"
    });
  });
});

app.listen(3000, () => {
    console.log('App listening on port 3000! http://localhost:3000');
  });