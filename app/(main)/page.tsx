import { PRODUCT_PER_PAGE } from "@/constants";
import getCurrentUser from "../actions/getCurrentUser";
import getProducts, { ProductParams } from "../actions/getProducts";
import Categories from "../components/categories/Categories";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import FloatingActionButton from "../components/FloatingActionButton";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

interface HomeProps {
  searchParams: Promise<ProductParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = await searchParams;
  const products = await getProducts(query);

  const currentPage = query.page ? Number(query.page) : 1;
  const currentUser = await getCurrentUser();

  if (products.data.length === 0)
    return (
      <Container>
        <Categories />
        <EmptyState showReset />
        <FloatingActionButton href={"/products/upload"}>+</FloatingActionButton>
      </Container>
    );
  else
    return (
      <Container>
        <Categories />
        <div className="grid grid-cols-1 gap-8 pt-12 px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {products.data.map((product) => {
            return (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            );
          })}
        </div>
        <Pagination
          page={currentPage}
          totalItems={products.totalItems}
          perPage={PRODUCT_PER_PAGE}
        />
        <FloatingActionButton href={"/products/upload"}>+</FloatingActionButton>
      </Container>
    );
}
