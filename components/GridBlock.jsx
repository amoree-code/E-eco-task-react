import Image from "next/image";
import React from "react";

const GridBlock = ({ data }) => {
  const { content, properties } = data;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${properties.cols}, 1fr)`,
        gridTemplateRows: `repeat(${properties.rows}, 1fr)`,
        gap: `${properties.line_spacing}px ${properties.interitem_spacing}px`,
        margin: `${properties.top_bottom_margins}px ${properties.left_right_margins}px`,
      }}
    >
      {content.map((item, index) => (
        <div
          key={index}
          style={{
            aspectRatio: properties.ratio ? `${properties.ratio}/1` : "auto",
            backgroundColor: properties.background_color || "transparent",
            borderRadius: properties.border_radius
              ? `${properties.border_radius}px`
              : "0",
            boxShadow: properties.has_shadow
              ? "0 2px 8px rgba(0, 0, 0, 0.1)"
              : "none",
            overflow: "hidden",
          }}
        >
          <Image
            src={item.image}
            alt=""
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default GridBlock;
