import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function StockChart({ products }) {
  // If no products data, show placeholder
  if (!products || products.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No product data available yet</div>
  }

  // Format data for chart and filter out any invalid products
  const data = products
    .filter((product) => product && product.name) // Filter out undefined or invalid products
    .map((product) => ({
      name: product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name,
      stock: product.stock,
      unit: product.unit || "count",
      fullName: product.name, // Keep full name for tooltip
      status: product.status || "Normal",
    }))

  // If no valid data after filtering, show placeholder
  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-500">No valid product data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value, name, props) => {
            if (!props || !props.payload) return [value, "Stock"]
            return [`${value} ${props.payload.unit || ""}`, "Stock"]
          }}
          labelFormatter={(label, props) => {
            if (!props || !props.payload || props.payload.length === 0) return label
            return props.payload[0].payload.fullName || label
          }}
          contentStyle={{ fontSize: "12px" }}
        />
        <Bar
          dataKey="stock"
          fill={(entry) =>
            entry && entry.status === "Critical" ? "#ef4444" : entry && entry.status === "Low" ? "#f59e0b" : "#10b981"
          }
          radius={[4, 4, 0, 0]}
          label={{
            position: "right",
            fill: "#374151",
            fontSize: 10,
            formatter: (item) => item.stock,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}



// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

// export default function StockChart({ products }) {
//   // If no products data, show placeholder
//   if (!products || products.length === 0) {
//     return <div className="flex items-center justify-center h-full text-gray-500">No product data available yet</div>
//   }

//   // Format data for chart and filter out any invalid products
//   const data = products
//     .filter((product) => product && product.name) // Filter out undefined or invalid products
//     .map((product) => ({
//       name: product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name,
//       stock: product.stock,
//       unit: product.unit || "count",
//       fullName: product.name, // Keep full name for tooltip
//       status: product.status || "Normal",
//     }))

//   // If no valid data after filtering, show placeholder
//   if (data.length === 0) {
//     return <div className="flex items-center justify-center h-full text-gray-500">No valid product data available</div>
//   }

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//         <XAxis type="number" tick={{ fontSize: 12 }} />
//         <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
//         <Tooltip
//           formatter={(value, name, props) => {
//             if (!props || !props.payload) return [value, "Stock"]
//             return [`${value} ${props.payload.unit || ""}`, "Stock"]
//           }}
//           labelFormatter={(label, props) => {
//             if (!props || !props.payload || props.payload.length === 0) return label
//             return props.payload[0].payload.fullName || label
//           }}
//           contentStyle={{ fontSize: "12px" }}
//         />
//         <Bar
//           dataKey="stock"
//           fill={(entry) =>
//             entry && entry.status === "Critical" ? "#ef4444" : entry && entry.status === "Low" ? "#f59e0b" : "#10b981"
//           }
//           radius={[4, 4, 0, 0]}
//           label={{
//             position: "right",
//             fill: "#374151",
//             fontSize: 10,
//             formatter: (item) => item.stock,
//           }}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }

