import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { User } from '../models/userModel';

const accessToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const candidate = await User.findOne({ name });

  if (candidate) {
    return next(new AppError('User with this name already exists', 400));
  }

  const hashPassword = await bcrypt.hash(password, 7);

  const newUser = await User.create({ name, password: hashPassword });

  const token = accessToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) return next(new AppError('Name or password is missing', 400));

  const user = await User.findOne({ name }).select('+password');
  if (!user) return next(new AppError(`User with the name ${name} doesn't exist`, 401));

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) return next(new AppError('Incorrect password', 401));

  const token = accessToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
