import { Product, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import HeartButton from "../HeartButton";
import { fromNow } from "../../libs/dayjs";

interface ProductCardProps {
  currentUser?: User | null;
  data: Product;
}

const ProductCard = ({ data, currentUser }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("ko-KR").format(data.price);

  return (
    <Link
      href={`/products/${data.id}`}
      className="group col-span-1 block"
      aria-label={`${data.title} 상품 카드`}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <Image
            src={data.imgSrc}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover transition duration-300 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute top-3 right-3">
            <HeartButton productId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
              {data.title}
            </h3>
            <span className="whitespace-nowrap rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
              {data.category}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              {formattedPrice}원
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-400">
              {fromNow(data.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
