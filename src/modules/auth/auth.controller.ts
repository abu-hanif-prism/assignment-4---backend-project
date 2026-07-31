import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const user = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logged in successfully',
    data: { user: result.user },
  });
});

const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie('accessToken');

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logged out successfully',
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  logoutUser,
};
