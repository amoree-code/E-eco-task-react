"use client";

import { useQuery } from "@tanstack/react-query";
import { BarLoader, HashLoader } from "react-spinners";
import axios from "axios";
import GridBlock from "./GridBlock";
import ProductCell from "./ProductCell";

const fetchBlocks = async () => {
  const response = await axios.get(
    "https://run.mocky.io/v3/821b7a26-9da2-4af7-a874-466d5759f60b"
  );
  if (!response.data?.content) {
    throw new Error("Unexpected API response structure");
  }
  const content = response.data.content.map((block) => ({
    ...block,
    content: block.content.map((item) => ({ ...item })),
    properties: { ...block.properties },
  }));
  return content;
};

const BlockRenderer = () => {
  const {
    data: blocks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: fetchBlocks,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center text-center">
        <HashLoader color="#de1d23" loading size={200} speedMultiplier={2} />
      </div>
    );
  if (error) {
    const isUsageLimitError =
      error.response?.data?.error?.name === "usageLimitError" ||
      error.message.includes("usage limit");

    return (
      <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-4">
        {isUsageLimitError ? (
          <>
            <h1 className="mb-4 text-red-600 text-xl font-semibold">
              لقد تجاوزت الحد الشهري للطلبات.
            </h1>
            <p className="mb-4 text-gray-700">
              فريقكم يسمح بـ 1000 طلب شهرياً على mock server. الرجاء الانتظار
              حتى بداية الشهر القادم أو الاتصال بالمسؤول لرفع الحد.
            </p>
          </>
        ) : (
          <h1 className="text-red-500">{error.message}</h1>
        )}
        <BarLoader color="#de1d23" loading size={200} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] m-auto">
      {blocks?.map((block, index) => {
        if (block.type === "grid") {
          return <GridBlock key={index} data={block} />;
        } else if (block.type === "products") {
          return <ProductCell key={index} product={block} />;
        }
        return null;
      })}
    </div>
  );
};

export default BlockRenderer;
