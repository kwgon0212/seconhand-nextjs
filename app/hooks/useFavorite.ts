import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

    if (!currentUser) return;

    try {
      let req;
      if (hasFavorite) req = () => axios.delete(`/api/favorites/${productId}`);
      else req = () => axios.post(`/api/favorites/${productId}`);

      await req();
      router.refresh();
    } catch (error) {
      console.error("toggleFavorite error", error);
    }
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
