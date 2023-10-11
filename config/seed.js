require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Item = require('../models/item');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Breakfast', sortOrder:10},
    {name: 'Desserts', sortOrder: 20}
  ])

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Hamburger', emoji: '🍔', category: categories[2], price: 5.95},
    {name: 'Noodles', emoji: '🍜',  category: categories[2], price: 11.95},
])

console.log(items)

process.exit();

})();