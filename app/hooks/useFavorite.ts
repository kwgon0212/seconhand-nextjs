import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface UseFavoriteProps {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavoriteProps) => {
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    if (!currentUser) return false;
    return currentUser.favoriteIds.includes(productId);
  }, [productId, currentUser]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLElement>) => {
    // 링크 이동 방지 및 부모 클릭 이벤트 차단
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast.warn("먼저 로그인을 해주세요");
      return;
    }

    try {
      let req;
      if (hasFavorite) req = () => axios.delete(`/api/favorites/${productId}`);
      else req = () => axios.post(`/api/favorites/${productId}`);

      await req();
      router.refresh();
      toast.success("찜이 등록되었습니다!");
    } catch (error) {
      toast.error("찜이 등록되지 않았습니다");
    }
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
