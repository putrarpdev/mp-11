import React from 'react'
import { PieChart, Pie, Cell, } from 'recharts';
import { useState, useEffect } from 'react';

const DashboardData = () => {
  const [data, setData] = useState()
}

const data = [
    { name: 'Seminar', value: 10},
    { name: 'Talkshow', value: 10 },
    { name: 'Konser', value: 10 },
    // { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28',];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

const PieComponent = () => {
  const [eventCategory, setEventCategory] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/dashboardData')

      const data = await response.json()
      setEventCategory(data.eventCategory)
    }
    fetchData();
  }, []);

  return (
    <div>
      <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className='grid grid-cols-3'>
            {
                data.map((item, index) => (
                    <p key={index} className='cursor-pointer font-bold'>{item.name}</p>
                ))
            }

        </div>
        <div className='grid grid-cols-3 mt-[15px]'>
            {
                COLORS.map((item, index) => (
                    <div className='h-[40px] w-[40px]' style={{ backgroundColor: item }} key={index}>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PieComponent;