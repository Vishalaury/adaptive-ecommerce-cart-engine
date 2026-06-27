const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [itemSchema],
  updatedAt: { type: Date, default: Date.now, expires: 86400 } 
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);