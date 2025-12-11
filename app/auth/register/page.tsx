"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useState } from "react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setisLoading(true);
    try {
      const { data } = await axios.post("/api/register", body);
      console.log(data);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl shadow-indigo-500/10 rounded-3xl border border-white/20">
          <h2 className="text-center text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            계정 만들기
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="name"
              label="이름"
              type="text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="email"
              label="이메일"
              type="email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="비밀번호"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <div className="pt-2">
              <Button
                label={isLoading ? "계정 생성 중..." : "계정 만들기"}
                onClick={() => {}}
                disabled={isLoading}
              />
            </div>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
                >
                  로그인
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
