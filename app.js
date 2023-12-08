const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const setupMiddlewares = require('./utils/middlewares');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Set up middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
