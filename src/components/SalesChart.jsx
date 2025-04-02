// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// export default function SalesChart({ salesData, period }) {
//   // If no sales data, show placeholder
//   if (!salesData || salesData.length === 0) {
//     return <div className="flex items-center justify-center h-full text-gray-500">No sales data available yet</div>
//   }

//   // Format data for chart if needed
//   const formattedData = salesData.map((item) => ({
//     name: item.date,
//     sales: item.sales,
//     profit: item.profit,
//   }))

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="name"
//           tick={{ fontSize: 12 }}
//           label={{
//             value: period === "week" ? "Day" : period === "month" ? "Date" : "Month",
//             position: "insideBottom",
//             offset: -5,
//           }}
//         />
//         <YAxis
//           tick={{ fontSize: 12 }}
//           width={50}
//           label={{
//             value: "Amount (PKR)",
//             angle: -90,
//             position: "insideLeft",
//           }}
//         />
//         <Tooltip formatter={(value) => `PKR ${Number(value).toLocaleString()}`} contentStyle={{ fontSize: "12px" }} />
//         <Legend wrapperStyle={{ fontSize: "12px" }} />
//         <Bar dataKey="sales" fill="#8884d8" name="Total Sales (PKR)" />
//         <Bar dataKey="profit" fill="#82ca9d" name="Profit (PKR)" />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function SalesChart({ salesData, period }) {
  // If no sales data, show placeholder
  if (!salesData || salesData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No sales data available yet</div>
  }

  // Format data for chart and ensure all required properties exist
  const formattedData = salesData
    .filter((item) => item && typeof item === "object") // Filter out invalid items
    .map((item) => ({
      name: item.date || "Unknown",
      sales: item.sales || 0,
      profit: item.profit || 0,
    }))

  // If no valid data after filtering, show placeholder
  if (formattedData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No valid sales data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          label={{
            value: period === "week" ? "Day" : period === "month" ? "Date" : "Month",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          width={50}
          label={{
            value: "Amount (PKR)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip formatter={(value) => `PKR ${Number(value).toLocaleString()}`} contentStyle={{ fontSize: "12px" }} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="sales" fill="#8884d8" name="Total Sales (PKR)" />
        <Bar dataKey="profit" fill="#82ca9d" name="Profit (PKR)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

