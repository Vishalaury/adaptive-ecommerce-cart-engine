
// const Cart = require('../models/Cart');
// const { calculateTieredDiscount } = require('../utils/discountEngine');

// const checkoutSummary = async (req, res, next) => {
//   try {
//     const userId = req.headers.userid; // Fixed lowercase header issue
//     if (!userId) return res.status(401).json({ error: 'Unauthorized: Missing userId header' });

//     const cart = await Cart.findOne({ userId });
//     if (!cart || cart.items.length === 0) {
//       return res.status(200).json({ message: 'Cart is empty', subtotal: 0, discount: 0, total: 0 });
//     }

//     const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//     const discount = calculateTieredDiscount(subtotal);
//     const total = subtotal - discount;

//     res.status(200).json({
//       cartContents: cart.items,
//       pricing: {
//         subtotal: parseFloat(subtotal.toFixed(2)),
//         discountApplied: discount,
//         total: parseFloat(total.toFixed(2))
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { checkoutSummary };


const Cart = require("../models/Cart");
const { calculateTieredDiscount } = require("../utils/discountEngine");

const checkoutSummary = async (req, res, next) => {
  try {
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: Missing userId header",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        cartContents: [],
        pricing: {
          subtotal: 0,
          discountApplied: 0,
          total: 0,
        },
      });
    }

    const subtotal = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const discount = calculateTieredDiscount(subtotal);
    const total = subtotal - discount;

    return res.status(200).json({
      cartContents: cart.items,
      pricing: {
        subtotal: Number(subtotal.toFixed(2)),
        discountApplied: discount,
        total: Number(total.toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkoutSummary };