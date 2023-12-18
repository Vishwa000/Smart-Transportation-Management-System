const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');
const setupMiddlewares = require('./utils/middlewares');
const registrationRoutes =  require('./routes/registrationRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const branchRoutes = require('./routes/branchRoutes');
const otpRoutes = require('./routes/otpRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());

// Set up middlewares
setupMiddlewares(app);

// Routes
app.use('/auth', registrationRoutes);
app.use('/api', otpRoutes);
app.use('/institute', instituteRoutes);
app.use('/branch', branchRoutes);

app.use((err,res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
