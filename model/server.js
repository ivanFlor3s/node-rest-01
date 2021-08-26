const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    //Connect to db
    this.conectDb();

    //MIDLEWARES
    this.middlewares();

    //RUTAS
    this.routes();
  }

  //Metodo que configura mis rutas
  routes() {
    this.app.use(this.usuariosPath, require("../routes/users.routes"));
    this.app.use(this.authPath, require('../routes/auth.routes'))
  }

  async conectDb() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parse del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
