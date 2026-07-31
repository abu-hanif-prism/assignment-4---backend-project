import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyServices } from './property.service';

const createProperty = catchAsync(async (req, res) => {
  const property = await PropertyServices.createProperty(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Property created successfully',
    data: property,
  });
});

const updateProperty = catchAsync(async (req, res) => {
  const property = await PropertyServices.updateProperty(
    req.params.id as string,
    req.user!.userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Property updated successfully',
    data: property,
  });
});

const deleteProperty = catchAsync(async (req, res) => {
  await PropertyServices.deleteProperty(req.params.id as string, req.user!.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Property deleted successfully',
  });
});

export const PropertyControllers = {
  createProperty,
  updateProperty,
  deleteProperty,
};
