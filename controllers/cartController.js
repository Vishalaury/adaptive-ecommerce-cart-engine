

// const Cart = require('../models/Cart');

// const ingestItem = async (req, res, next) => {
//   try {
//     const userId = req.headers.userid; // Fixed lowercase header issue
//     const { productId, name, price, quantity } = req.body;

//     if (!userId) return res.status(401).json({ error: 'Unauthorized: Missing userId header' });

//     let cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId === productId);

//     if (quantity === 0) {
//       if (itemIndex > -1) {
//         cart.items.splice(itemIndex, 1);
//       }
//     } else {
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity = quantity;
//         cart.items[itemIndex].price = price; 
//       } else {
//         cart.items.push({ productId, name, price, quantity });
//       }
//     }

//     cart.updatedAt = Date.now();
//     await cart.save();

//     res.status(200).json({ message: 'Cart updated', cart });
//   } catch (error) {
//     next(error);
//   }
// };

// const getCart = async (req, res, next) => {
//     try {
//         const userId = req.headers.userid; // Fixed lowercase header issue
//         if (!userId) return res.status(401).json({ error: 'Unauthorized: Missing userId header' });
        
//         const cart = await Cart.findOne({ userId });
//         res.status(200).json(cart || { userId, items: [] });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = { ingestItem, getCart };


const Cart = require("../models/Cart");

const ingestItem = async (req, res, next) => {
  try {
    const userId = req.headers.userid;
    const { productId, name, price, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: Missing userId header",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (quantity === 0) {
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = price;
        cart.items[itemIndex].name = name;
      } else {
        cart.items.push({
          productId,
          name,
          price,
          quantity,
        });
      }
    }

    cart.updatedAt = Date.now();

    await cart.save();

    return res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: Missing userId header",
      });
    }

    const cart = await Cart.findOne({ userId });

    return res.status(200).json(
      cart || {
        userId,
        items: [],
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ingestItem,
  getCart,
};