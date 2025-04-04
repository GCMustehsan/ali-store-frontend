"use client"

import { FaEdit } from "react-icons/fa"

export default function SaleDetailsDialog({ sale, isOpen, setIsOpen, isMobile, onDeleteSale, onEditSale }) {
  if (!sale || !isOpen) return null

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this sale? This will restore the product stock.")) {
      onDeleteSale(sale._id)
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Sale Details
              {sale.isManual && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                  Manual
                </span>
              )}
            </h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Invoice: {sale._id}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Sale Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Date:</div>
                <div>{formatDate(sale.date)}</div>
                <div className="font-medium">Payment Method:</div>
                <div>{sale.paymentMethod}</div>
                <div className="font-medium">Total Amount:</div>
                <div>PKR {sale.total.toLocaleString()}</div>
                <div className="font-medium">Total Profit:</div>
                <div className="text-green-600">PKR {sale.profit.toLocaleString()}</div>
                {sale.description && (
                  <>
                    <div className="font-medium">Description:</div>
                    <div>{sale.description}</div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Items Sold:</div>
                <div>{sale.items?.length || 0}</div>
                <div className="font-medium">Total Quantity:</div>
                <div>{sale.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}</div>
                <div className="font-medium">Profit Margin:</div>
                <div className="text-green-600">
                  {sale.total > 0 ? `${((sale.profit / sale.total) * 100).toFixed(2)}%` : "0%"}
                </div>
                <div className="font-medium">Type:</div>
                <div>{sale.isManual ? "Manual Entry" : "Product Sale"}</div>
              </div>
            </div>
          </div>

          {!sale.isManual && sale.items && sale.items.length > 0 ? (
            isMobile ? (
              // Mobile view - card layout for items
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Sale Items</h3>
                {sale.items.map((item, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                      <div className="text-gray-500">Quantity:</div>
                      <div>
                        {item.quantity} {item.unit}
                      </div>
                      <div className="text-gray-500">Purchase Price:</div>
                      <div>PKR {item.purchasePrice.toLocaleString()}</div>
                      <div className="text-gray-500">Sale Price:</div>
                      <div>PKR {item.salePrice.toLocaleString()}</div>
                      <div className="text-gray-500">Subtotal:</div>
                      <div>PKR {(item.salePrice * item.quantity).toLocaleString()}</div>
                      <div className="text-gray-500">Profit:</div>
                      <div className="text-green-600">
                        PKR {((item.salePrice - item.purchasePrice) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                    <div>Total:</div>
                    <div>PKR {sale.total.toLocaleString()}</div>
                    <div>Total Profit:</div>
                    <div className="text-green-600">PKR {sale.profit.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop view - table layout
              <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Purchase Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sale Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sale.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          PKR {item.purchasePrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          PKR {item.salePrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          PKR {(item.salePrice * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">
                          PKR {((item.salePrice - item.purchasePrice) * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right"
                      >
                        Total:
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        PKR {sale.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                        PKR {sale.profit.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-center text-gray-500">
                {sale.isManual ? (
                  <p>This is a manually entered sale. No product items are associated with this transaction.</p>
                ) : (
                  <p>No items found for this sale.</p>
                )}
                {sale.description && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-700">Description:</h4>
                    <p className="mt-1 text-gray-600">{sale.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => {
                onEditSale(sale)
                setIsOpen(false)
              }}
            >
              <FaEdit className="inline mr-1 h-4 w-4" /> Edit Sale
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Sale
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


// "use client"

// import { FaEdit } from "react-icons/fa"

// export default function SaleDetailsDialog({ sale, isOpen, setIsOpen, isMobile, onDeleteSale, onEditSale }) {
//   if (!sale || !isOpen) return null

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this sale? This will restore the product stock.")) {
//       onDeleteSale(sale._id)
//       setIsOpen(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <div className="p-4 md:p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Sale Details</h2>
//             <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
//               ✕
//             </button>
//           </div>
//           <p className="text-sm text-gray-500 mb-4">Invoice: {sale._id}</p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <div className="mb-2">
//                 <h3 className="text-sm font-medium text-gray-500">Sale Information</h3>
//               </div>
//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div className="font-medium">Date:</div>
//                 <div>{formatDate(sale.date)}</div>
//                 <div className="font-medium">Payment Method:</div>
//                 <div>{sale.paymentMethod}</div>
//                 <div className="font-medium">Total Amount:</div>
//                 <div>PKR {sale.total.toLocaleString()}</div>
//                 <div className="font-medium">Total Profit:</div>
//                 <div className="text-green-600">PKR {sale.profit.toLocaleString()}</div>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <div className="mb-2">
//                 <h3 className="text-sm font-medium text-gray-500">Summary</h3>
//               </div>
//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div className="font-medium">Items Sold:</div>
//                 <div>{sale.items.length}</div>
//                 <div className="font-medium">Total Quantity:</div>
//                 <div>{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</div>
//                 <div className="font-medium">Profit Margin:</div>
//                 <div className="text-green-600">
//                   {sale.total > 0 ? `${((sale.profit / sale.total) * 100).toFixed(2)}%` : "0%"}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {isMobile ? (
//             // Mobile view - card layout for items
//             <div className="space-y-3">
//               <h3 className="text-sm font-medium text-gray-700">Sale Items</h3>
//               {sale.items.map((item, index) => (
//                 <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
//                   <div className="font-medium text-gray-900">{item.productName}</div>
//                   <div className="grid grid-cols-2 gap-2 text-sm mt-2">
//                     <div className="text-gray-500">Quantity:</div>
//                     <div>
//                       {item.quantity} {item.unit}
//                     </div>
//                     <div className="text-gray-500">Purchase Price:</div>
//                     <div>PKR {item.purchasePrice.toLocaleString()}</div>
//                     <div className="text-gray-500">Sale Price:</div>
//                     <div>PKR {item.salePrice.toLocaleString()}</div>
//                     <div className="text-gray-500">Subtotal:</div>
//                     <div>PKR {(item.salePrice * item.quantity).toLocaleString()}</div>
//                     <div className="text-gray-500">Profit:</div>
//                     <div className="text-green-600">
//                       PKR {((item.salePrice - item.purchasePrice) * item.quantity).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-4">
//                 <div className="grid grid-cols-2 gap-2 text-sm font-bold">
//                   <div>Total:</div>
//                   <div>PKR {sale.total.toLocaleString()}</div>
//                   <div>Total Profit:</div>
//                   <div className="text-green-600">PKR {sale.profit.toLocaleString()}</div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Desktop view - table layout
//             <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Product
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Quantity
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Unit
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Purchase Price
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Sale Price
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Subtotal
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Profit
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {sale.items.map((item, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {item.productName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         PKR {item.purchasePrice.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         PKR {item.salePrice.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                         PKR {(item.salePrice * item.quantity).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">
//                         PKR {((item.salePrice - item.purchasePrice) * item.quantity).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                   <tr>
//                     <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
//                       Total:
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
//                       PKR {sale.total.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
//                       PKR {sale.profit.toLocaleString()}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               onClick={() => {
//                 onEditSale(sale)
//                 setIsOpen(false)
//               }}
//             >
//               <FaEdit className="inline mr-1 h-4 w-4" /> Edit Sale
//             </button>
//             <button
//               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
//               onClick={handleDelete}
//             >
//               Delete Sale
//             </button>
//             <button
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
