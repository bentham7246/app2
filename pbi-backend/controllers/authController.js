const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};



exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist in body
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  //2) Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || (user.password !== password)) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  //3) If every thing ok then Sign token and send response
  createSendToken(user, 200, res);
});



exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting token and check if  it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! please log in to get access.', 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if the user exist
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    next(
      new AppError(`The user belong to this token does not longer exist.`),
      401
    );
  }

  //4) Check if the user changed the password after issue token
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(`User changed password recently! Please log in again.`),
      401
    );
  }

  //If every thing OK than Grant access
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorized to perform this action!', 403)
      );
    }
    next();
  };
};


