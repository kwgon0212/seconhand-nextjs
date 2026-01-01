import { categories } from "../categories/Categories";

interface ProductCategoryProps {
  category: string;
}

const ProductCategory = ({ category }: ProductCategoryProps) => {
  const categoryData = categories.find((cat) => cat.path === category);

  return (
    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium text-gray-600 bg-gray-100 mb-3">
      {categoryData?.label || category}
    </span>
  );
};

export default ProductCategory;
