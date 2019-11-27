const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodb');

const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true, 
            useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false});
        console.log('Connected to Data Base...')
    }catch(e){
        console.log('error');
        process.exit(1)
    }

}

module.exports = connectDB;