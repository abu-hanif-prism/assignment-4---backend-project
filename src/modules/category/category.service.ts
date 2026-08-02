import { prisma } from '../../lib/prisma.js';

type TCategoryPayload = {
  name: string;
  description?: string;
};

const createCategory = async (payload: TCategoryPayload) => {
  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description ?? null,
    },
  });

  return category;
};

const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
};

const getSingleCategory = async (id: string) => {
  return prisma.category.findUniqueOrThrow({ where: { id } });
};

const updateCategory = async (id: string, payload: Partial<TCategoryPayload>) => {
  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
