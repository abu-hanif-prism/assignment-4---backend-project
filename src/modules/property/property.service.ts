import { StatusCodes } from 'http-status-codes';
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

export const PropertyServices = {
  createProperty,
  updateProperty,
  deleteProperty,
};
