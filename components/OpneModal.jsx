import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import Image from "next/image";

function OpenModal({ item, isOpen, onOpenChange }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-black/20 backdrop-blur-sm",
        base: "border-none",
        wrapper: "backdrop-blur-none",
      }}
      className="h-[520px]"
      size="xl"
    >
      <ModalContent className=" bg-white/90 backdrop-blur-lg border border-gray-200">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#141414] line-clamp-1  ">
                {item?.title}
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-row items-end justify-end gap-6">
                <div className="flex-shrink-0">
                  <p className="text-lg text-[#575757] mt-4 text-right my-2">
                    الألوان:
                  </p>

                  <Image
                    alt={item?.title}
                    className="object-cover rounded-xl border border-[#F69393] "
                    src={item?.image}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-end items-end ">
                <p className="text-sm text-[#575757] mt-4">الحجم</p>
                <button className="w-[100px] h-[40px] border border-[#D22525] rounded-xl p-2.5 ">
                  Default
                </button>
              </div>
            </ModalBody>
            <ModalFooter className="w-full flex items-center justify-between">
              <div className="w-full flex items-center gap-2">
                <Button color="default" variant="flat" onPress={onClose}>
                  الغاء
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="bg-[#D22525] w-[180px] h-[40px] rounded-2xl  "
                >
                  إضافة للسلة
                </Button>
              </div>
              <Button className="w-[180px] h-[50px] bg-[#FFFFFF] border-[#E7E5E5] ">
                {item.price.currency} {item.price.value}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default OpenModal;
