const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const setupMiddlewares = require('./utils/middlewares');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const driverRoutes = require('./routes/driverRoutes');
const passengerRoutes = require('./routes/passengerRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Set up middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/driver', driverRoutes);
app.use('/passenger', passengerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
