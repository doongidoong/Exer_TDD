const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {type : String },
    email: {
        type: String,
        unique: true 
    } 

  });

const Store = mongoose.model('store', storeSchema);



module.exports = Store;