const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  qty: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isPaid: Boolean,
  orderTotal: Number,
});

module.exports = mongoose.model('Order', orderSchema);