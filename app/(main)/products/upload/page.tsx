"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "@/app/components/ImageUpload";
import { categories } from "@/app/components/categories/Categories";
import CategoryInput from "@/app/components/categories/CategoryInput";
import dynamic from "next/dynamic";
const KakaoMap = dynamic(() => import("@/app/components/KakaoMap"), {
  ssr: false,
});

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      lat: 33.5563,
      lng: 126.79581,
      imgSrc: "",
      price: 1,
    },
  });

  const imgSrc = watch("imgSrc");
  const category = watch("category");
  const lat = watch("lat");
  const lng = watch("lng");
  const setCustomValue = (id: string, value: unknown) => setValue(id, value);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* 폼 카드 */}
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 rounded-3xl border border-white/20 p-8 md:p-10">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Heading
                title="상품 업로드"
                subtitle="새로운 상품을 등록해주세요"
                center
              />

              <ImageUpload
                value={imgSrc}
                onChange={(v) => setCustomValue("imgSrc", v)}
              />

              {/* 상품명 */}
              <Input
                id="title"
                label="상품명을 입력해주세요"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />

              {/* 상품 설명 */}
              <Input
                id="description"
                label="설명을 입력해주세요"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />

              {/* 가격 */}
              <Input
                id="price"
                label="가격을 입력해주세요"
                formatPrice={true}
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />

              {/* 카테고리 선택 영역 */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">
                  카테고리 선택
                </label>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200 overflow-y-auto">
                  {categories.map((item) => (
                    <CategoryInput
                      key={item.path}
                      onClick={(category) =>
                        setCustomValue("category", category)
                      }
                      selected={category === item.path}
                      label={item.label}
                      icon={item.icon}
                      path={item.path}
                    />
                  ))}
                </div>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-2">
                    카테고리를 선택해주세요
                  </p>
                )}
              </div>

              {/* <KakaoMap setCustomValue={setCustomValue} lat={lat} lng={lng} /> */}
              <KakaoMap lat={lat} lng={lng} setCustomValue={setCustomValue} />

              {/* 제출 버튼 */}
              <div className="pt-4">
                <Button
                  onClick={() => {}}
                  label={isLoading ? "업로드 중..." : "상품 등록하기"}
                  disabled={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductUploadPage;
