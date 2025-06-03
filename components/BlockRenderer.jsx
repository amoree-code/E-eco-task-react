"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import GridBlock from "./GridBlock";
import ProductCell from "./ProductCell";
import PuffLoader from "react-spinners/PuffLoader";
import { HashLoader, ScaleLoader } from "react-spinners";

const BlockRenderer = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://97894d09-3ce6-408f-8a95-603c37b013a1.mock.pstmn.io/mocks/challenges/frontend/home"
        );

        if (response.data && response.data.content) {
          setBlocks(response.data.content);
        } else {
          setError("Unexpected API response structure");
        }
      } catch (err) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center text-center">
        <HashLoader color="#de1d23" loading size={200} speedMultiplier={2} />
      </div>
    );
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-[1200px] m-auto">
      {blocks.map((block, index) => {
        if (block.type === "grid") {
          return <GridBlock key={index} data={block} />;
        } else if (block.type === "products") {
          return <ProductCell key={index} product={block} />;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
