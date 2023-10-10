const mongoose = require('mongoose');
require('./category');
const Item = mongoose.model('Item', itemSchema);

const itemSchema = require('./itemSchema');

module.exports = Item;