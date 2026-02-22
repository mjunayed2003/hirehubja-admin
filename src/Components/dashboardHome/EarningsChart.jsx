import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-50 text-center min-w-[100px]">
        <p className="text-[#1A1A1A] font-bold text-lg">
          {payload[0].value} $
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {label}
        </p>
      </div>
    );
  }
  return null;
};

const EarningsChart = ({ earningChart }) => {
  const [filterType, setFilterType] = useState("Weekly");

  // Mock data for different views
  const weeklyData = [
    { name: "Sunday", earnings: 100 },
    { name: "Monday", earnings: 350 },
    { name: "Tuesday", earnings: 250 },
    { name: "Wednesday", earnings: 456 },
    { name: "Thursday", earnings: 150 },
    { name: "Friday", earnings: 300 },
    { name: "Saturday", earnings: 480 },
  ];

  const monthlyData = [
    { name: "Week 1", earnings: 1200 },
    { name: "Week 2", earnings: 2100 },
    { name: "Week 3", earnings: 800 },
    { name: "Week 4", earnings: 1600 },
  ];

  const yearlyData = [
    { name: "Jan", earnings: 5000 },
    { name: "Feb", earnings: 7000 },
    { name: "Mar", earnings: 4000 },
    { name: "Apr", earnings: 8500 },
    { name: "May", earnings: 6000 },
    { name: "Jun", earnings: 9000 },
    { name: "Jul", earnings: 11000 },
    { name: "Aug", earnings: 8000 },
    { name: "Sep", earnings: 9500 },
    { name: "Oct", earnings: 10500 },
    { name: "Nov", earnings: 12000 },
    { name: "Dec", earnings: 11500 },
  ];

  // Determine which data to show
  const getData = () => {
    // If you want to use API data when available, uncomment the line below:
    // if (earningChart && earningChart.length > 0) return earningChart;
    
    switch (filterType) {
      case "Monthly":
        return monthlyData;
      case "Yearly":
        return yearlyData;
      case "Weekly":
      default:
        return weeklyData;
    }
  };

  const currentData = getData();

  return (
    <div className="w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">Earning</h2>
          <p className="text-[#9ea0a5] text-xs mt-1">
            Earning graph preview from the platform
          </p>
        </div>

        {/* Dropdown for Weekly / Monthly / Yearly */}
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-200 text-gray-500 text-sm rounded px-4 py-1.5 pr-8 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          
          {/* Green Arrow Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="fill-current h-3 w-3 text-green-500" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Dashed Separator Line */}
      <div className="border-b border-dashed border-gray-200 mb-6 mt-2 w-full"></div>

      {/* Chart Section */}
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#43B948" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#43B948" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#43B948', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6c757d', fontSize: 12, marginTop: 10 }}
              dy={10} 
              interval={0} // Show all ticks (adjust if data is too long)
            />

            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#43B948"
              strokeWidth={3}
              fill="url(#colorEarnings)"
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#43B948' }}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;