const mongoose = require('mongoose');
require('./category');


const itemSchema = require('./itemSchema');


const Item = mongoose.model('Item', itemSchema);
module.exports = Item;