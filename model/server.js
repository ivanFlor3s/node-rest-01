const express = require("express");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT


    //MIDLEWARES
    this.middlewares()

    //RUTAS
    this.routes();


  }

  //Metodo que configura mis rutas
  routes() {

    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });

    
  }

  
  middlewares(){
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
