export default function DailySalesTable({ dailySales }) {
  // Sort by date in descending order (newest first)
  const sortedSales = [...dailySales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="overflow-x-auto -mx-3 md:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sales Count
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Revenue
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Profit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedSales.length > 0 ? (
              sortedSales.map((day, index) => (
                <tr key={day.date} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {formatDate(day.date)}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {day.count}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    PKR {day.sales.toLocaleString()}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-green-600">
                    PKR {day.profit.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-3 md:px-6 py-4 text-center text-sm text-gray-500">
                  No sales data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// export default function DailySalesTable({ dailySales }) {
//     // Sort by date in descending order (newest first)
//     const sortedSales = [...dailySales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
//     // Format date for display
//     const formatDate = (dateString) => {
//       const date = new Date(dateString)
//       return date.toLocaleDateString("en-US", {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })
//     }
  
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Sales Count
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Total Revenue
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Total Profit
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sortedSales.map((day, index) => (
//               <tr key={day.date} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(day.date)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.count}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PKR {day.sales.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">PKR {day.profit.toLocaleString()}</td>
//               </tr>
//             ))}
//             {sortedSales.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
//                   No sales data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     )
//   }
  
  