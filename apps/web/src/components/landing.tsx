import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jul',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Aug',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Sep',
    uv: 9800,
    pv: 7800,
    amt: 2290,
  },
  {
    name: 'Oct',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Nov',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Dec',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

import { FaUsers, FaRegCalendarCheck, FaEllipsisV, } from "react-icons/fa";
import { BsTicketPerforated } from "react-icons/bs";
import PieComponent from './pieComponent';

const Landing = () => {
    return (
        <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
            <div className="flex items-center justify-between">
                <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer">Dashboard</h1>
                <button className="bg-[#2E59D9] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor-pointer">Generate Report</button>
            </div>
            <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">ATTENDEES</h2>
                        <h2 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">500</h2>
                    </div>
                    <FaUsers fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#72e4a2] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#53866e] text-[11px] leading-[17px] font-bold">TICKET SOLD(ANNUAL)</h2>
                        <h2 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">500</h2>
                    </div>
                    <BsTicketPerforated fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#e270af] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">TICKET SOLD(MONTHLY)</h2>
                        <h2 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">150</h2>
                    </div>
                    <BsTicketPerforated fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#e9e064] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">EVENTS</h2>
                        <h2 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">10</h2>
                    </div>
                    <FaRegCalendarCheck fontSize={28} color="" />
                </div>
            </div>

            <div className='flex mt-[22px] w-full gap-[30px]'>
                <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2>Earnings overview</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer'/>
                    </div>
                    <div>
                        <LineChart
                            width={1150}
                            height={500}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
                <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2>Event Category</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer'/>
                    </div>
                    <div className='pl-[35px]'>
                        <PieComponent />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Landing;