const express = require("express");
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    //MIDLEWARES
    this.middlewares()

    //RUTAS
    this.routes();


  }

  //Metodo que configura mis rutas
  routes() {

        this.app.use(this.usuariosPath  ,require('../routes/users.routes'))
    
  }

  
  middlewares(){

      //CORS
      this.app.use(cors())

      //Directorio publico
      this.app.use(express.static('public'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
