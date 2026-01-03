import { User } from "@prisma/client";
import { fromNow } from "@/app/libs/dayjs";
import Avatar from "../Avatar";

interface ProductInfoProps {
  description: string;
  user: User;
  createdAt: Date;
}

const ProductInfo = ({ description, user, createdAt }: ProductInfoProps) => {
  return (
    <>
      <div className="pt-6 border-t border-gray-200">
        <div className="text-sm font-semibold text-gray-900 mb-3">
          상품 설명
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <div className="text-sm font-semibold text-gray-900 mb-3">판매자</div>
        <div className="flex items-center gap-3">
          <Avatar image={user.image} name={user.name} size={48} />
          <div>
            <div className="text-gray-900 font-medium">{user.name}</div>
            <div className="text-xs text-gray-400">{fromNow(createdAt)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
