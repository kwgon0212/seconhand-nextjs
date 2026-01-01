import { Prisma } from "@prisma/client";
import prisma from "@/app/libs/prisma";
import { PRODUCT_PER_PAGE } from "@/constants";

export interface ProductParams {
  lat?: number;
  lng?: number;
  category?: string;
  page?: number;
  skip?: number;
}

const getProducts = async (params: ProductParams) => {
  try {
    const { lat, lng, category, skip } = params;

    const query: Prisma.ProductWhereInput = {};

    if (category) query.category = category;
    if (lat) {
      query.lat = {
        gte: Number(lat) - 0.01,
        lte: Number(lat) + 0.01,
      };
    }
    if (lng) {
      query.lng = {
        gte: Number(lng) - 0.01,
        lte: Number(lng) + 0.01,
      };
    }

    const totalItems = await prisma.product.count({ where: query });

    const products = await prisma.product.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
      skip: skip ? Number(skip) : 0,
      take: PRODUCT_PER_PAGE,
    });

    return { data: products, totalItems };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};

export default getProducts;
