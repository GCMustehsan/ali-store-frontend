"use client"

import { useState } from "react"
import { FaEdit, FaTrash, FaEye, FaEllipsisV } from "react-icons/fa"

export default function InventoryTable({
  products,
  filteredProducts,
  handleEditProduct,
  setEditingProduct,
  setIsEditDialogOpen,
  handleDeleteProduct,
  onViewDetails,
  isMobile,
}) {
  const [showActionsFor, setShowActionsFor] = useState(null)

  // Mobile action menu toggle
  const toggleActions = (id) => {
    if (showActionsFor === id) {
      setShowActionsFor(null)
    } else {
      setShowActionsFor(id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isMobile ? (
        // Mobile view - card layout
        <div className="divide-y divide-gray-200">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="relative">
                    <button
                      className="p-2 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleActions(product._id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {showActionsFor === product._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              onViewDetails(product)
                              setShowActionsFor(null)
                            }}
                          >
                            <FaEye className="mr-2 h-4 w-4" /> View Details
                          </button>
                          <button
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setEditingProduct(product)
                              setIsEditDialogOpen(true)
                              setShowActionsFor(null)
                            }}
                          >
                            <FaEdit className="mr-2 h-4 w-4" /> Edit
                          </button>
                          <button
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleDeleteProduct(product._id)
                              setShowActionsFor(null)
                            }}
                          >
                            <FaTrash className="mr-2 h-4 w-4" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Purchase:</span> PKR {product.purchasePrice.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-500">Sale:</span> PKR {product.salePrice.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-500">Stock:</span> {product.stock} {product.unit}
                  </div>
                  <div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "Critical"
                          ? "bg-red-100 text-red-800"
                          : product.status === "Low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="flex-1 text-center text-sm text-blue-600 hover:text-blue-900 py-1 border border-blue-200 rounded-md"
                    onClick={() => onViewDetails(product)}
                  >
                    <FaEye className="inline mr-1 h-4 w-4" /> View
                  </button>
                  <button
                    className="flex-1 text-center text-sm text-indigo-600 hover:text-indigo-900 py-1 border border-indigo-200 rounded-md"
                    onClick={() => {
                      setEditingProduct(product)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <FaEdit className="inline mr-1 h-4 w-4" /> Edit
                  </button>
                  <button
                    className="flex-1 text-center text-sm text-red-600 hover:text-red-900 py-1 border border-red-200 rounded-md"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <FaTrash className="inline mr-1 h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">No products added yet</div>
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
                  Product Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      PKR {product.purchasePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      PKR {product.salePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : product.status === "Low"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          onClick={() => onViewDetails(product)}
                        >
                          <FaEye className="h-4 w-4 mr-1" /> View
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          onClick={() => {
                            setEditingProduct(product)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <FaEdit className="h-4 w-4 mr-1" /> Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 flex items-center"
                          onClick={() => handleDeleteProduct(product._id)}
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
                    No products added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


// "use client"

// import { useState } from "react"
// import { FaEdit, FaTrash, FaEye, FaEllipsisV } from "react-icons/fa"

// export default function InventoryTable({
//   products,
//   filteredProducts,
//   handleEditProduct,
//   setEditingProduct,
//   setIsEditDialogOpen,
//   handleDeleteProduct,
//   onViewDetails,
//   isMobile,
// }) {
//   const [showActionsFor, setShowActionsFor] = useState(null)

//   // Mobile action menu toggle
//   const toggleActions = (id) => {
//     if (showActionsFor === id) {
//       setShowActionsFor(null)
//     } else {
//       setShowActionsFor(id)
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       {isMobile ? (
//         // Mobile view - card layout
//         <div className="divide-y divide-gray-200">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div key={product._id} className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-medium text-gray-900">{product.name}</h3>
//                     <p className="text-sm text-gray-500">{product.category}</p>
//                   </div>
//                   <div className="relative">
//                     <button
//                       className="p-2 text-gray-500 hover:text-gray-700"
//                       onClick={() => toggleActions(product._id)}
//                     >
//                       <FaEllipsisV />
//                     </button>
//                     {showActionsFor === product._id && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                         <div className="py-1">
//                           <button
//                             className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => {
//                               onViewDetails(product)
//                               setShowActionsFor(null)
//                             }}
//                           >
//                             <FaEye className="mr-2 h-4 w-4" /> View Details
//                           </button>
//                           <button
//                             className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => {
//                               setEditingProduct(product)
//                               setIsEditDialogOpen(true)
//                               setShowActionsFor(null)
//                             }}
//                           >
//                             <FaEdit className="mr-2 h-4 w-4" /> Edit
//                           </button>
//                           <button
//                             className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => {
//                               handleDeleteProduct(product._id)
//                               setShowActionsFor(null)
//                             }}
//                           >
//                             <FaTrash className="mr-2 h-4 w-4" /> Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
//                   <div>
//                     <span className="text-gray-500">Purchase:</span> PKR {product.purchasePrice.toLocaleString()}
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Sale:</span> PKR {product.salePrice.toLocaleString()}
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Stock:</span> {product.stock} {product.unit}
//                   </div>
//                   <div>
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         product.status === "Critical"
//                           ? "bg-red-100 text-red-800"
//                           : product.status === "Low"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {product.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-4 text-center text-sm text-gray-500">No products added yet</div>
//           )}
//         </div>
//       ) : (
//         // Desktop view - table layout
//         <div className="responsive-table-container">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Product Name
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Category
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Purchase Price
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Sale Price
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Stock
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Status
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr key={product._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       PKR {product.purchasePrice.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       PKR {product.salePrice.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.stock} {product.unit}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           product.status === "Critical"
//                             ? "bg-red-100 text-red-800"
//                             : product.status === "Low"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {product.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           className="text-blue-600 hover:text-blue-900 flex items-center"
//                           onClick={() => onViewDetails(product)}
//                         >
//                           <FaEye className="h-4 w-4 mr-1" /> View
//                         </button>
//                         <button
//                           className="text-indigo-600 hover:text-indigo-900 flex items-center"
//                           onClick={() => {
//                             setEditingProduct(product)
//                             setIsEditDialogOpen(true)
//                           }}
//                         >
//                           <FaEdit className="h-4 w-4 mr-1" /> Edit
//                         </button>
//                         <button
//                           className="text-red-600 hover:text-red-900 flex items-center"
//                           onClick={() => handleDeleteProduct(product._id)}
//                         >
//                           <FaTrash className="h-4 w-4 mr-1" /> Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
//                     No products added yet
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   )
// }

