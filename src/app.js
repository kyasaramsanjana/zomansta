const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const reelRoutes = require('./routes/reelRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reels', reelRoutes);

app.use(errorHandler);

module.exports = app;
