import getCurrentUser from "@/app/actions/getCurrentUser";
import getProudctById, { Params } from "@/app/actions/getProductById";
import EmptyState from "@/app/components/EmptyState";
import ProductClient from "./ProductClient";

const ProductsPage = async ({ params }: { params: Promise<Params> }) => {
  const parameters = await params;

  const currentUser = await getCurrentUser();
  const product = await getProudctById(parameters);

  if (!product) return <EmptyState />;

  return <ProductClient product={product} currentUser={currentUser} />;
};

export default ProductsPage;
