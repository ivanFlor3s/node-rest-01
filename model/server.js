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

    this.app.get("/api", (req, res) => {
      res.json({
          msg: "GET en API"
      });
    });
    this.app.post("/api", (req, res) => {
      res.json({
          msg: "post en API"
      });
    });
    this.app.delete("/api", (req, res) => {
      res.json({
          msg: "delete en API"
      });
    });
    this.app.put("/api", (req, res) => {
      res.json({
          msg: "put en API"
      });
    });
    this.app.patch("/api", (req, res) => {
      res.json({
          msg: "patch en API"
      });
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
