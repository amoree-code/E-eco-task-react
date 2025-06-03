"use client";

import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import axios from "axios";
import GridBlock from "./GridBlock";
import ProductCell from "./ProductCell";

const fetchBlocks = async () => {
  const response = await axios.get(
    "https://97894d09-3ce6-408f-8a95-603c37b013a1.mock.pstmn.io/mocks/challenges/frontend/home"
  );
  if (!response.data?.content) {
    throw new Error("Unexpected API response structure");
  }
  const content = response.data.content.map((block) => ({
    ...block,
    // Ensure we only pass plain objects
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
  });

  if (isLoading)
    return (
      <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center text-center">
        <HashLoader color="#de1d23" loading size={200} speedMultiplier={2} />
      </div>
    );
  if (error)
    return <div className="p-4 text-center text-red-500">{error.message}</div>;

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
