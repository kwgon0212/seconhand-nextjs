interface ProductHeadProps {
  title: string;
  price: number;
}

const ProductHead = ({ title, price }: ProductHeadProps) => {
  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <div className="text-2xl font-bold text-gray-900">{formattedPrice}원</div>
    </div>
  );
};

export default ProductHead;
