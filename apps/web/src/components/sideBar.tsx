import React from "react";
import { FaTachometerAlt, FaChevronCircleLeft, FaChevronCircleRight, FaRegHeart, } from "react-icons/fa";
import { TfiViewListAlt, TfiUser, TfiMoney } from "react-icons/tfi"

const Sidebar = () => {
  return (
    <div className="bg-[#4E73DF] h-screen px-[25px]">
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <FaTachometerAlt color="white" />
        <p className="text-[14px] leading-[20px] font-bold text-white">Dashboard</p>

      </div>
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">INTERFACE</p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <TfiUser color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white">Users</p>
          </div>
          <FaChevronCircleRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <TfiViewListAlt color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white">Event List</p>
          </div>
          <FaChevronCircleRight color="white" />
        </div>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <TfiMoney color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white">Transactions</p>
          </div>
          <FaChevronCircleRight color="white" />
        </div>
      </div>

      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">ADD ONS</p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <FaRegHeart color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white">Feedback</p>
          </div>
          <FaChevronCircleRight color="white" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;