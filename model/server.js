const express = require("express");
const fileupload = require('express-fileupload');
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:       '/api/auth',
      buscar:     '/api/buscar',
      categorias: '/api/categorias',
      usuario:    '/api/usuarios',
      productos:  '/api/productos',
      uploads:    '/api/uploads'
    }
   

    //Connect to db
    this.conectDb();

    //MIDLEWARES
    this.middlewares();

    //RUTAS
    this.routes();
  }

  //Metodo que configura mis rutas
  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
    this.app.use(this.paths.usuario, require("../routes/users.routes"));
    this.app.use(this.paths.buscar, require('../routes/buscar.routes'))
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
    this.app.use(this.paths.productos, require('../routes/producto.routes'))
    this.app.use(this.paths.categorias, require('../routes/categoria.routes'))
  }

  async conectDb() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Fileupload
    this.app.use(fileupload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
    }));

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
