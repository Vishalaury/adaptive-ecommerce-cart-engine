// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const errorHandler = require('./middleware/errorHandler');
// const rateLimiter = require('./middleware/rateLimiter');

// const userRoutes = require('./routes/userRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const checkoutRoutes = require('./routes/checkoutRoutes');

// const app = express();

// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(rateLimiter); 

// app.use('/api/users', userRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/checkout', checkoutRoutes);

// app.use(errorHandler);

// module.exports = app;


const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

//  Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Adaptive E-Commerce Cart Engine API is running'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use(errorHandler);

module.exports = app;