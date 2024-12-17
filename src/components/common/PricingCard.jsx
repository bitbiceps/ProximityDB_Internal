import React from "react";
import tick from "../../assets/circle-tick.svg";
import { Link } from "react-router-dom";

export const PricingCard = ({ category, duration, price, included, excluded }) => {
  return (
    <div
      className="w-[300px] bg-[#ffffff] py-[34px] rounded-[12px]"
      style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
    >
      <div className="text-[#202224] font-bold text-[18px] w-full text-center">{category}</div>
      <div className="mt-[14px] text-[13px] text-[#212121] text-center font-normal">{duration}</div>
      <div className="font-extrabold text-[40px] text-[#FE5E00] leading-[40px] mt-[14px] text-center">{price}</div>
      {/* Divider */}
      <div className="mx-[24px] mt-[30px] opacity-[30%] h-[1.7px] bg-[#212121]"></div>
      <div className="flex flex-col items-center mt-[5px]">
        {/* Included Items */}
        {included.map((item, index) => (
          <div className="flex justify-start mt-[25px] w-[190px]" key={index}>
            <img src={tick} alt="tick" />
            <div className="ml-[12px] font-semibold text-[#212121] text-[14px]">{item}</div>
          </div>
        ))}
        {/* Excluded Items */}
        {excluded.map((item, index) => (
          <div className="flex justify-start mt-[25px] w-[190px]" key={index}>
            <div className="ml-[30px] font-semibold text-[#21212180] text-[14px]">{item}</div>
          </div>
        ))}
      </div>
      {/* Divider */}
      <div className="mx-[24px] mt-[50px] opacity-[30%] h-[1.7px] bg-[#212121]"></div>
      <div className="mt-[30px] flex justify-center">
        <button className="border-[1.7px] border-[#4D49F6] rounded-full text-[#4D49F6] font-bold text-[14px] py-[16px] px-[34px]">
          Get Start
        </button>
      </div>
      <div className="text-center mt-[24px]">
        <Link className="text-[14px] font-semibold text-[#212121] underline">Start Your Free Trial</Link>
      </div>
    </div>
  );
};
