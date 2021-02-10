const express = require('express');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');

//Middlewares
const app = express();

//Global middle wares

//Body parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));


//Serving static files
app.use(express.static(`${__dirname}/public`));

//cors
app.use(cors())

//Routes
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `This route ${req.originalUrl} is not found on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
