import prisma from "@/app/libs/prisma";

export interface Params {
  productId?: string;
}

const getProudctById = async (params: Params) => {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (!product) return null;
    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};

export default getProudctById;
