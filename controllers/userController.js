// const User = require('../models/User');

// const createUser = async (req, res, next) => {
//   try {
//     const { email, name } = req.body;
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({ email, name });
//     }
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { createUser };


const User = require("../models/User");

const createUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json(user);
    }

    // Create new user
    user = await User.create({ email, name });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };