const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const otpRoutes = require('./routes/otpRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5000/', // Replace with your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};


app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));