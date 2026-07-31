import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const category = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryServices.getAllCategories();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const category = await CategoryServices.getSingleCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await CategoryServices.updateCategory(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await CategoryServices.deleteCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category deleted successfully',
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
