const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_CONECTIONSTRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Base de datos arriba')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la db')
    }
    
}


module.exports = {
    dbConnection
}