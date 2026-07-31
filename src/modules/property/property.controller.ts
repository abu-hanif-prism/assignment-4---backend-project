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

const getAllProperties = catchAsync(async (req, res) => {
  const { categoryId, minPrice, maxPrice, isAvailable, search, page, limit } = req.query;

  const result = await PropertyServices.getAllProperties({
    categoryId: categoryId as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    isAvailable: isAvailable !== undefined ? isAvailable === 'true' : undefined,
    search: search as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Properties retrieved successfully',
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req, res) => {
  const property = await PropertyServices.getSingleProperty(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Property retrieved successfully',
    data: property,
  });
});

export const PropertyControllers = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
};
