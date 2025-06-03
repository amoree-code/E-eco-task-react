import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <section className="h-20 flex items-center justify-between  bg-[#DFDFE880] rounded-3xl  m-2.5 p-2.5  md:m-5 md:p-5">
      <div className="lg:w-[400px] flex items-center justify-center gap-4">
        <Image src="/assets/cart.svg" alt="" width={45} height={45} />
        <Image src="/assets/Vector.svg" alt="" width={20} height={20} />
        <button className="h-10 flex items-center justify-between p-4 rounded-xl gap-2 bg-[#FFFFFF] mr-2">
          <span className="text-[#000000] text-sm">انشاء حساب</span>
          <Image src="/assets/Icon.svg" alt="" width={19} height={19} />
        </button>
      </div>
      <div className="hidden lg:w-full md:flex items-center justify-center gap-1">
        <div className="h-10 flex items-center justify-between gap-2 mr-2.5">
          <span>العربية</span>
          <Image src="/assets/Language.svg" alt="" width={25} height={25} />
        </div>
        <div className="relative">
          <input
            type="text"
            className="h-10 w-[250px] lg:w-[550px] rounded-xl p-2.5 border border-[#D0D0D0] bg-[#FFFFFF]"
            placeholder="ابحث عن منتج او ماركة"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Image
              src="/assets/Default.svg"
              alt="search"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="ml-2">
        <Image src="/assets/Group.svg" alt="search" width={130} height={50} />
      </div>
    </section>
  );
};

export default Header;
