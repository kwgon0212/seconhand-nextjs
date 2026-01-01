"use client";

import Container from "@/app/components/Container";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import dynamic from "next/dynamic";
import ProductCategory from "@/app/components/products/ProductCategory";
import ProductHead from "@/app/components/products/ProductHead";
import ProductInfo from "@/app/components/products/ProductInfo";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

const KakaoMap = dynamic(() => import("@/app/components/KakaoMap"), {
  ssr: false,
});

interface ProductClientProps {
  product: Product & { user: User };
  currentUser?: User | null;
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  const router = useRouter();
  return (
    <Container>
      <div className="max-w-5xl mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 이미지 */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
              <Image
                src={product.imgSrc}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3">
                <HeartButton productId={product.id} currentUser={currentUser} />
              </div>
            </div>
          </div>

          {/* 정보 */}
          <div className="flex flex-col">
            <div className="mb-6">
              <ProductCategory category={product.category} />
              <ProductHead title={product.title} price={product.price} />
            </div>

            <ProductInfo
              description={product.description}
              user={product.user}
              createdAt={product.createdAt}
            />
          </div>
        </div>

        {/* 지도 */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="mb-4 text-sm font-semibold text-gray-900">
            거래 희망 지역
          </div>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <KakaoMap lat={product.lat} lng={product.lng} detailPage={true} />
          </div>
        </div>

        <div className="mt-8">
          <Button
            label="이 유저와 채팅하기"
            onClick={() => {
              router.push("/chat");
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
