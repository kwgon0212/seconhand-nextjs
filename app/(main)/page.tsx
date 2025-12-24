import getCurrentUser from "../actions/getCurrentUser";
import getProducts, { ProductParams } from "../actions/getProducts";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import FloatingActionButton from "../components/FloatingActionButton";
import ProductCard from "../components/ProductCard";

export default async function Home(searchParams: ProductParams) {
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  if (products.data.length === 0)
    return (
      <Container>
        <EmptyState showReset />
        <FloatingActionButton href={"/"}>+</FloatingActionButton>
      </Container>
    );
  else
    return (
      <>
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
        <FloatingActionButton href={"/products/upload"}>+</FloatingActionButton>
      </>
    );
}
