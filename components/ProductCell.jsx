import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import Image from "next/image";
import OpenModal from "./OpneModal";

const ProductCell = ({ product }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const properties = product.properties;

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 items-center justify-between gap-3 px-5">
      {product.content.map((item) => (
        <Card
          key={item.id}
          className="h-[350px] bg-[#FCFCFC] border border-[#E8E8E8]"
        >
          <CardHeader className="relative pb-0 pt-2 px-4 flex-col items-center">
            <div className="absolute h-full right-0 p-2.5 flex flex-col items-center justify-between gap-1">
              <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-[#FCFCFC] shadow-custom blur-0">
                {properties.has_favourite_btn ? (
                  <Image
                    alt="Favorite Icon"
                    className="object-cover cursor-pointer"
                    src={"/assets/love.svg"}
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    alt="Card background"
                    className="object-cover cursor-pointer"
                    src={"/assets/Vector.svg"}
                    width={20}
                    height={20}
                  />
                )}
              </div>

              <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-[#FCFCFC] shadow-custom blur-0">
                <Image
                  alt="Card background"
                  className={`object-cover cursor-pointer ${
                    !item.is_available ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                  src={"/assets/shopping.svg"}
                  onClick={() => item.is_available && handleOpenModal(item)}
                  width={20}
                  height={20}
                />
              </div>
            </div>

            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={item.image}
              width={150}
              height={150 / parseFloat(properties.image_ratio)}
            />

            <div className="absolute h-full left-0 p-2.5 flex flex-col items-center justify-between">
              {item.start_tag && (
                <div
                  style={{ backgroundColor: item.start_tag.bg_color }}
                  className="w-[70px] h-[20px] flex items-center justify-center rounded-full shadow-custom blur-0"
                >
                  <span
                    style={{ color: item.start_tag.color }}
                    className="text-[13px]"
                  >
                    {item.start_tag.title}
                  </span>
                </div>
              )}
              {item.end_tag && (
                <div
                  style={{ backgroundColor: item.end_tag.bg_color }}
                  className="w-[70px] h-[20px] flex items-center justify-center rounded-full shadow-custom blur-0 mt-2"
                >
                  <span
                    style={{ color: item.end_tag.color }}
                    className="text-[13px]"
                  >
                    {item.end_tag.title}
                  </span>
                </div>
              )}

              {properties.should_show_rating && (
                <div className="w-[75px] h-[25px] flex items-center justify-center gap-0.5 p-0.5 rounded-md bg-[#FCFCFC] shadow-custom blur-0">
                  <span className="text-sm">
                    <b className="text-gray-600">{item.rating}</b>{" "}
                    <small className="font-sans">({item.rating_count})</small>
                  </span>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={"/assets/star.svg"}
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <CardBody className="text-right items-end justify-between overflow-hidden">
            <div>
              {properties.should_show_title && (
                <h1
                  className={`text-[18px] text-[#575757] font-semibold line-clamp-2 ${properties.title_lines}`}
                  style={{ WebkitLineClamp: properties.title_lines }}
                >
                  {item.title}
                </h1>
              )}

              <h1 className="font-bold text-[15px] text-[#141414]">
                {item.price.currency} {item.price.value}
              </h1>
              <del className="font-normal text-[14px] text-[#A5A5A5]">
                {item.price.original_value}
              </del>
            </div>

            <div className="relative w-full h-[65px] flex flex-col items-end justify-end gap-2">
              <div className="flex items-center justify-end gap-1">
                <span className="text-[14px] text-[#575757] font-bold">
                  هدية
                </span>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={"/assets/gift.svg"}
                  width={16}
                  height={16}
                />
              </div>

              {properties.should_show_variations &&
                item.colors &&
                item.colors.length > 0 && (
                  <div className="absolute inset-0 -top-3 w-[30px] h-[80px] flex flex-col items-center justify-start rounded-full bg-[#FFFFFF] ">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-[16px] h-[16px] border rounded-full "
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {item.colors.length > 3 && (
                      <span className="border rounded-full text-xs mt-1">
                        +{item.colors.length - 3}
                      </span>
                    )}
                  </div>
                )}

              {properties.should_show_brand && (
                <div className="w-[130px] h-7 flex items-center justify-center gap-1 rounded-full bg-[#1C1C1C] cursor-pointer">
                  <span className="text-[14px] text-[#FCFCFC] font-normal">
                    {item.brand}
                  </span>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={"/assets/paper.svg"}
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ))}

      {selectedItem && (
        <OpenModal
          item={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={handleCloseModal}
        />
      )}
    </section>
  );
};

export default ProductCell;
