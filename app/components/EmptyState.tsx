"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "일치하는 항목이 없습니다.",
  subtitle = "일부 필터를 변경하거나 제거해 보세요.",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      {showReset && (
        <div className="w-48 mt-4">
          <Button
            outline
            label="모든 필터 제거"
            onClick={() => {
              router.replace("/");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
