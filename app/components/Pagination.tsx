"use client";

import usePagination from "@lucasmogari/react-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationLink from "./PaginationLink";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
}

const Pagination = ({ page, totalItems, perPage }: PaginationProps) => {
  const { getPageItem, totalPages, fromItem, toItem } = usePagination({
    totalItems: totalItems,
    page,
    itemsPerPage: perPage,
    maxPageItems: 3,
  });

  const firstPage = 1,
    nextPage = Math.min(page + 1, totalPages),
    previousPage = Math.max(page - 1, firstPage);

  const arr = new Array(totalPages + 2);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8 mb-4">
      {/* 결과 카운트 */}
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">{fromItem}</span> -{" "}
        <span className="font-medium text-gray-900">{toItem}</span> of{" "}
        <span className="font-medium text-gray-900">{totalItems}</span> results
      </div>

      {/* 페이지네이션 버튼 */}
      <nav
        className="flex items-center justify-center gap-1"
        aria-label="Pagination"
      >
        {[...arr].map((_, index) => {
          const { page, disabled, current } = getPageItem(index);

          if (page === "previous")
            return (
              <PaginationLink
                key={index}
                page={previousPage}
                disabled={disabled}
              >
                <ChevronLeft className="w-4 h-4" />
              </PaginationLink>
            );
          if (page === "next")
            return (
              <PaginationLink key={index} page={nextPage} disabled={disabled}>
                <ChevronRight className="w-4 h-4" />
              </PaginationLink>
            );
          if (page === "gap")
            return (
              <span key={index} className="px-3 py-2 text-gray-400 select-none">
                ...
              </span>
            );
          return (
            <PaginationLink key={index} page={page} active={current}>
              {page}
            </PaginationLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Pagination;
