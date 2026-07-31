import { StatusCodes } from 'http-status-codes';
import type { Prisma } from '../../../generated/prisma/client.js';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';

type TPropertyPayload = {
  title: string;
  description: string;
  address: string;
  price: number;
  categoryId: string;
  images?: string[];
  isAvailable?: boolean;
};

type TPropertyFilters = {
  categoryId?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  isAvailable?: boolean | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

const ensureOwnership = async (propertyId: string, landlordId: string) => {
  const property = await prisma.property.findUniqueOrThrow({ where: { id: propertyId } });

  if (property.landlordId !== landlordId) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You can only manage your own properties');
  }

  return property;
};

const createProperty = async (landlordId: string, payload: TPropertyPayload) => {
  const property = await prisma.property.create({
    data: {
      title: payload.title,
      description: payload.description,
      address: payload.address,
      price: payload.price,
      categoryId: payload.categoryId,
      images: payload.images ?? [],
      isAvailable: payload.isAvailable ?? true,
      landlordId,
    },
  });

  return property;
};

const updateProperty = async (
  propertyId: string,
  landlordId: string,
  payload: Partial<TPropertyPayload>,
) => {
  await ensureOwnership(propertyId, landlordId);

  return prisma.property.update({
    where: { id: propertyId },
    data: payload,
  });
};

const deleteProperty = async (propertyId: string, landlordId: string) => {
  await ensureOwnership(propertyId, landlordId);

  return prisma.property.delete({ where: { id: propertyId } });
};

const getAllProperties = async (filters: TPropertyFilters) => {
  const { categoryId, minPrice, maxPrice, isAvailable, search, page = 1, limit = 10 } = filters;

  const where: Prisma.PropertyWhereInput = {
    ...(categoryId && { categoryId }),
    isAvailable: isAvailable ?? true,
    ...((minPrice !== undefined || maxPrice !== undefined) && {
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        category: true,
        landlord: { select: { id: true, name: true, email: true, phone: true } },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    properties,
  };
};

const getSingleProperty = async (id: string) => {
  return prisma.property.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      landlord: { select: { id: true, name: true, email: true, phone: true } },
    },
  });
};

export const PropertyServices = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
};
