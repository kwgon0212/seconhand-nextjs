"use client";

import { PRODUCT_PER_PAGE } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { PropsWithChildren } from "react";

type PaginationLinkProps = {
  page?: number | string;
  disabled?: boolean;
  active?: boolean;
} & PropsWithChildren;

const PaginationLink = ({
  children,
  page,
  disabled,
  active,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCT_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;

  let currentQuery = {};
  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery = {
    ...currentQuery,
    page,
    skip,
  };

  if (disabled) {
    return (
      <span
        className={clsx(
          "flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg",
          "text-gray-300 cursor-not-allowed bg-gray-50",
          "border border-gray-200",
          "transition-all duration-200"
        )}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={{ query: updatedQuery }}
      className={clsx(
        "flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg",
        "font-medium text-sm transition-all duration-200",
        "border border-transparent",
        "hover:scale-105 active:scale-95",
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 font-semibold"
          : "text-gray-700 bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
