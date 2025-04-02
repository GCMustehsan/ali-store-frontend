"use client"

import { useState } from "react"
import { FaChevronDown, FaEye, FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa"

export default function SalesTable({
  sales,
  filteredSales,
  dateFilter,
  paymentFilter,
  setDateFilter,
  setPaymentFilter,
  searchTerm,
  isMobile,
  onViewDetails,
  onDeleteSale,
  onEditSale,
  onSearchChange,
}) {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false)
  const [showActionsFor, setShowActionsFor] = useState(null)

  // Mobile action menu toggle
  const toggleActions = (id) => {
    if (showActionsFor === id) {
      setShowActionsFor(null)
    } else {
      setShowActionsFor(id)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <input
            type="text"
            placeholder="Search by invoice..."
            className="w-full md:w-[250px] px-3 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => {
              // Add a prop for this function in the component parameters
              if (typeof onSearchChange === "function") {
                onSearchChange(e.target.value)
              }
            }}
          />
          <div className="relative w-full md:w-auto">
            <button
              className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              {dateFilter === "all"
                ? "All Time"
                : dateFilter === "today"
                  ? "Today"
                  : dateFilter === "yesterday"
                    ? "Yesterday"
                    : "This Week"}{" "}
              <FaChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDateFilter("all")
                    setIsDateDropdownOpen(false)
                  }}
                >
                  All Time
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDateFilter("today")
                    setIsDateDropdownOpen(false)
                  }}
                >
                  Today
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDateFilter("yesterday")
                    setIsDateDropdownOpen(false)
                  }}
                >
                  Yesterday
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDateFilter("thisWeek")
                    setIsDateDropdownOpen(false)
                  }}
                >
                  This Week
                </button>
              </div>
            )}
          </div>
          <div className="relative w-full md:w-auto">
            <button
              className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
            >
              {paymentFilter === "all" ? "All Payments" : paymentFilter} <FaChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isPaymentDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setPaymentFilter("all")
                    setIsPaymentDropdownOpen(false)
                  }}
                >
                  All
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setPaymentFilter("Cash")
                    setIsPaymentDropdownOpen(false)
                  }}
                >
                  Cash
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setPaymentFilter("Card")
                    setIsPaymentDropdownOpen(false)
                  }}
                >
                  Card
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setPaymentFilter("Bank Transfer")
                    setIsPaymentDropdownOpen(false)
                  }}
                >
                  Bank Transfer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isMobile ? (
          // Mobile view - card layout
          <div className="divide-y divide-gray-200">
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <div key={sale._id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{sale._id.substring(0, 8)}...</h3>
                      <p className="text-sm text-gray-500">{formatDate(sale.date)}</p>
                    </div>
                    <div className="relative">
                      <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => toggleActions(sale._id)}>
                        <FaEllipsisV />
                      </button>
                      {showActionsFor === sale._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                onViewDetails(sale)
                                setShowActionsFor(null)
                              }}
                            >
                              <FaEye className="mr-2 h-4 w-4" /> View Details
                            </button>
                            <button
                              className="flex w-full items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                              onClick={() => {
                                onEditSale && onEditSale(sale)
                                setShowActionsFor(null)
                              }}
                            >
                              <FaEdit className="mr-2 h-4 w-4" /> Edit Sale
                            </button>
                            <button
                              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => {
                                onDeleteSale(sale._id)
                                setShowActionsFor(null)
                              }}
                            >
                              <FaTrash className="mr-2 h-4 w-4" /> Delete Sale
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Items:</span> {sale.items.length}
                    </div>
                    <div>
                      <span className="text-gray-500">Payment:</span> {sale.paymentMethod}
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span> PKR {sale.total.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-500">Profit:</span>{" "}
                      <span className="text-green-600">PKR {sale.profit.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    className="mt-3 w-full text-center text-sm text-blue-600 hover:text-blue-900 py-1 border border-blue-200 rounded-md"
                    onClick={() => onViewDetails(sale)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">No sales recorded yet</div>
            )}
          </div>
        ) : (
          // Desktop view - table layout
          <div className="responsive-table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Profit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <tr key={sale._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale._id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(sale.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.items.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PKR {sale.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PKR {sale.profit.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                            onClick={() => onViewDetails(sale)}
                          >
                            <FaEye className="h-4 w-4 mr-1" /> View
                          </button>
                          <button
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            onClick={() => onEditSale && onEditSale(sale)}
                          >
                            <FaEdit className="h-4 w-4 mr-1" /> Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 flex items-center"
                            onClick={() => onDeleteSale(sale._id)}
                          >
                            <FaTrash className="h-4 w-4 mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No sales recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}


// "use client"

// import { useState } from "react"
// import { FaChevronDown, FaEye, FaEllipsisV, FaTrash } from "react-icons/fa"

// export default function SalesTable({
//   sales,
//   filteredSales,
//   dateFilter,
//   paymentFilter,
//   setDateFilter,
//   setPaymentFilter,
//   searchTerm,
//   isMobile,
//   onViewDetails,
//   onDeleteSale,
//   onSearchChange,
// }) {
//   const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
//   const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false)
//   const [showActionsFor, setShowActionsFor] = useState(null)

//   // Mobile action menu toggle
//   const toggleActions = (id) => {
//     if (showActionsFor === id) {
//       setShowActionsFor(null)
//     } else {
//       setShowActionsFor(id)
//     }
//   }

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
//           <input
//             type="text"
//             placeholder="Search by invoice..."
//             className="w-full md:w-[250px] px-3 py-2 border border-gray-300 rounded-md"
//             value={searchTerm}
//             onChange={(e) => {
//               // Add a prop for this function in the component parameters
//               if (typeof onSearchChange === "function") {
//                 onSearchChange(e.target.value)
//               }
//             }}
//           />
//           <div className="relative w-full md:w-auto">
//             <button
//               className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//               onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
//             >
//               {dateFilter === "all"
//                 ? "All Time"
//                 : dateFilter === "today"
//                   ? "Today"
//                   : dateFilter === "yesterday"
//                     ? "Yesterday"
//                     : "This Week"}{" "}
//               <FaChevronDown className="ml-2 h-4 w-4" />
//             </button>
//             {isDateDropdownOpen && (
//               <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setDateFilter("all")
//                     setIsDateDropdownOpen(false)
//                   }}
//                 >
//                   All Time
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setDateFilter("today")
//                     setIsDateDropdownOpen(false)
//                   }}
//                 >
//                   Today
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setDateFilter("yesterday")
//                     setIsDateDropdownOpen(false)
//                   }}
//                 >
//                   Yesterday
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setDateFilter("thisWeek")
//                     setIsDateDropdownOpen(false)
//                   }}
//                 >
//                   This Week
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="relative w-full md:w-auto">
//             <button
//               className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//               onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
//             >
//               {paymentFilter === "all" ? "All Payments" : paymentFilter} <FaChevronDown className="ml-2 h-4 w-4" />
//             </button>
//             {isPaymentDropdownOpen && (
//               <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setPaymentFilter("all")
//                     setIsPaymentDropdownOpen(false)
//                   }}
//                 >
//                   All
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setPaymentFilter("Cash")
//                     setIsPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Cash
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setPaymentFilter("Card")
//                     setIsPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Card
//                 </button>
//                 <button
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   onClick={() => {
//                     setPaymentFilter("Bank Transfer")
//                     setIsPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Bank Transfer
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {isMobile ? (
//           // Mobile view - card layout
//           <div className="divide-y divide-gray-200">
//             {filteredSales.length > 0 ? (
//               filteredSales.map((sale) => (
//                 <div key={sale._id} className="p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-gray-900">{sale._id.substring(0, 8)}...</h3>
//                       <p className="text-sm text-gray-500">{formatDate(sale.date)}</p>
//                     </div>
//                     <div className="relative">
//                       <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => toggleActions(sale._id)}>
//                         <FaEllipsisV />
//                       </button>
//                       {showActionsFor === sale._id && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                           <div className="py-1">
//                             <button
//                               className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                               onClick={() => {
//                                 onViewDetails(sale)
//                                 setShowActionsFor(null)
//                               }}
//                             >
//                               <FaEye className="mr-2 h-4 w-4" /> View Details
//                             </button>
//                             <button
//                               className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                               onClick={() => {
//                                 onDeleteSale(sale._id)
//                                 setShowActionsFor(null)
//                               }}
//                             >
//                               <FaTrash className="mr-2 h-4 w-4" /> Delete Sale
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <span className="text-gray-500">Items:</span> {sale.items.length}
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Payment:</span> {sale.paymentMethod}
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Amount:</span> PKR {sale.total.toLocaleString()}
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Profit:</span>{" "}
//                       <span className="text-green-600">PKR {sale.profit.toLocaleString()}</span>
//                     </div>
//                   </div>
//                   <button
//                     className="mt-3 w-full text-center text-sm text-blue-600 hover:text-blue-900 py-1 border border-blue-200 rounded-md"
//                     onClick={() => onViewDetails(sale)}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-sm text-gray-500">No sales recorded yet</div>
//             )}
//           </div>
//         ) : (
//           // Desktop view - table layout
//           <div className="responsive-table-container">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Invoice
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Items
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Payment
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Amount
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Profit
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredSales.length > 0 ? (
//                   filteredSales.map((sale) => (
//                     <tr key={sale._id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {sale._id.substring(0, 8)}...
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(sale.date)}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.items.length}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.paymentMethod}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         PKR {sale.total.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         PKR {sale.profit.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end gap-2">
//                           <button
//                             className="text-blue-600 hover:text-blue-900 flex items-center"
//                             onClick={() => onViewDetails(sale)}
//                           >
//                             <FaEye className="h-4 w-4 mr-1" /> View
//                           </button>
//                           <button
//                             className="text-red-600 hover:text-red-900 flex items-center"
//                             onClick={() => onDeleteSale(sale._id)}
//                           >
//                             <FaTrash className="h-4 w-4 mr-1" /> Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
//                       No sales recorded yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

