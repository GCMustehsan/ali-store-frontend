// import { useState, useEffect } from "react"
// import { FaChevronDown, FaPlus } from "react-icons/fa"
// import toast from "react-hot-toast"
// import Sidebar from "./Sidebar"
// import Header from "./Header"
// import DashboardCards from "./DashboardCards"
// import SalesChart from "./SalesChart"
// import StockChart from "./StockChart"
// import InventoryTable from "./InventoryTable"
// import SalesTable from "./SalesTable"
// import ProductForm from "./ProductForm"
// import SaleForm from "./SaleForm"
// import ProductDetailsDialog from "./ProductDetailsDialog"
// import SaleDetailsDialog from "./SaleDetailsDialog"
// import { productAPI, saleAPI, dashboardAPI } from "../services/api"

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard")
//   const [products, setProducts] = useState([])
//   const [sales, setSales] = useState([])
//   const [dashboardStats, setDashboardStats] = useState({
//     totalProducts: 0,
//     lowStockProducts: 0,
//     totalSales: 0,
//     totalRevenue: 0,
//     totalProfit: 0,
//   })
//   const [salesChartData, setSalesChartData] = useState([])
//   const [stockChartData, setStockChartData] = useState([])
//   const [categoryData, setCategoryData] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [stockFilter, setStockFilter] = useState("all")
//   const [dateFilter, setDateFilter] = useState("all")
//   const [paymentFilter, setPaymentFilter] = useState("all")
//   const [chartPeriod, setChartPeriod] = useState("week")
//   const [showLowStockNotification, setShowLowStockNotification] = useState(false)
//   const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false)
//   const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false)
//   const [selectedSale, setSelectedSale] = useState(null)
//   const [isSaleDetailsOpen, setIsSaleDetailsOpen] = useState(false)

//   // New product form state
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     purchasePrice: 0,
//     salePrice: 0,
//     stock: 0,
//     unit: "count",
//   })

//   // Edit product state
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

//   // Check for mobile screen size
//   useEffect(() => {
//     const checkIsMobile = () => {
//       const mobile = window.innerWidth < 768
//       setIsMobile(mobile)
//       if (mobile) {
//         setSidebarOpen(false)
//       } else {
//         setSidebarOpen(true)
//       }
//     }

//     // Initial check
//     checkIsMobile()

//     // Add event listener
//     window.addEventListener("resize", checkIsMobile)

//     // Cleanup
//     return () => window.removeEventListener("resize", checkIsMobile)
//   }, [])

//   // Fetch data based on active tab
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         if (activeTab === "dashboard") {
//           // Fetch dashboard data
//           const stats = await dashboardAPI.getStats()
//           setDashboardStats(stats)

//           const chartData = await dashboardAPI.getSalesChartData(chartPeriod)
//           setSalesChartData(chartData)

//           const stockData = await dashboardAPI.getStockChartData()
//           setStockChartData(stockData)

//           const categoryDistribution = await dashboardAPI.getCategoryDistribution()
//           setCategoryData(categoryDistribution)

//           // Fetch sales for the sales table
//           const salesData = await saleAPI.getAll()
//           setSales(salesData)

//           // Fetch products for stock chart
//           const productsData = await productAPI.getAll()
//           setProducts(productsData)

//           // Check for low stock
//           const lowStockCount = stats.lowStockProducts
//           setShowLowStockNotification(lowStockCount > 0)
//           if (lowStockCount > 0) {
//             toast.error(`${lowStockCount} products are running low on stock. Please check inventory.`)
//           }
//         } else if (activeTab === "inventory") {
//           // Fetch products
//           const productsData = await productAPI.getAll()
//           setProducts(productsData)
//         } else if (activeTab === "sales") {
//           // Fetch sales
//           const salesData = await saleAPI.getAll()
//           setSales(salesData)

//           // We also need products for the sale form
//           const productsData = await productAPI.getAll()
//           setProducts(productsData)
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error)
//         toast.error("Failed to fetch data. Please try again.")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [activeTab, chartPeriod])

//   // Add new product
//   const handleAddProduct = async () => {
//     try {
//       const createdProduct = await productAPI.create(newProduct)

//       setProducts([...products, createdProduct])

//       setNewProduct({
//         name: "",
//         category: "",
//         purchasePrice: 0,
//         salePrice: 0,
//         stock: 0,
//         unit: "count",
//       })

//       toast.success("New product has been added to inventory.")

//       // Close the dialog after adding
//       setIsProductDialogOpen(false)
//     } catch (error) {
//       console.error("Error adding product:", error)
//       toast.error(error.response?.data?.message || "Failed to add product. Please try again.")
//     }
//   }

//   // Edit product
//   const handleEditProduct = async () => {
//     if (!editingProduct) return

//     try {
//       const updatedProduct = await productAPI.update(editingProduct._id, editingProduct)

//       const updatedProducts = products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))

//       setProducts(updatedProducts)
//       setIsEditDialogOpen(false)
//       setEditingProduct(null)

//       toast.success("Product information has been updated.")
//     } catch (error) {
//       console.error("Error updating product:", error)
//       toast.error(error.response?.data?.message || "Failed to update product. Please try again.")
//     }
//   }

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await productAPI.delete(id)

//       setProducts(products.filter((product) => product._id !== id))

//       toast.success("Product has been removed from inventory.")
//     } catch (error) {
//       console.error("Error deleting product:", error)
//       toast.error(error.response?.data?.message || "Failed to delete product. Please try again.")
//     }
//   }

//   // Add new sale
//   const handleAddSale = async (newSaleData) => {
//     try {
//       // Format the data for the API
//       const saleData = {
//         items: newSaleData.items,
//         paymentMethod: newSaleData.paymentMethod,
//       }

//       // Create the sale
//       const createdSale = await saleAPI.create(saleData)

//       // Update the sales list
//       setSales([createdSale, ...sales])

//       // Refresh products to get updated stock levels
//       const updatedProducts = await productAPI.getAll()
//       setProducts(updatedProducts)

//       // Refresh dashboard stats
//       if (activeTab === "dashboard") {
//         const stats = await dashboardAPI.getStats()
//         setDashboardStats(stats)
//       }

//       toast.success(
//         `Sale of PKR ${createdSale.total.toLocaleString()} has been recorded with PKR ${createdSale.profit.toLocaleString()} profit.`,
//       )

//       // Close the dialog after adding
//       setIsSaleDialogOpen(false)
//     } catch (error) {
//       console.error("Error adding sale:", error)
//       toast.error(error.response?.data?.message || "Failed to add sale. Please try again.")
//     }
//   }

//   // Delete sale
//   const handleDeleteSale = async (id) => {
//     try {
//       await saleAPI.delete(id)

//       // Remove the sale from the list
//       setSales(sales.filter((sale) => sale._id !== id))

//       // Refresh products to get updated stock levels
//       const updatedProducts = await productAPI.getAll()
//       setProducts(updatedProducts)

//       // Refresh dashboard stats if on dashboard
//       if (activeTab === "dashboard") {
//         const stats = await dashboardAPI.getStats()
//         setDashboardStats(stats)
//       }

//       toast.success("Sale has been deleted successfully.")
//     } catch (error) {
//       console.error("Error deleting sale:", error)
//       toast.error(error.response?.data?.message || "Failed to delete sale. Please try again.")
//     }
//   }

//   // View product details
//   const handleViewProductDetails = (product) => {
//     setSelectedProduct(product)
//     setIsProductDetailsOpen(true)
//   }

//   // View sale details
//   const handleViewSaleDetails = (sale) => {
//     setSelectedSale(sale)
//     setIsSaleDetailsOpen(true)
//   }

//   // Filter products based on search and filters
//   const filteredProducts = products.filter((product) => {
//     if (!product) return false

//     const matchesSearch =
//       product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category?.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

//     const matchesStock =
//       stockFilter === "all" ||
//       (stockFilter === "inStock" && product.stock > 0) ||
//       (stockFilter === "lowStock" && product.status === "Low") ||
//       (stockFilter === "critical" && product.status === "Critical")

//     return matchesSearch && matchesCategory && matchesStock
//   })

//   // Filter sales based on search and filters
//   const filteredSales = sales.filter((sale) => {
//     if (!sale) return false

//     const matchesSearch = sale._id?.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesDate =
//       dateFilter === "all" ||
//       (dateFilter === "today" &&
//         new Date(sale.date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0]) ||
//       (dateFilter === "yesterday" &&
//         new Date(sale.date).toISOString().split("T")[0] ===
//           new Date(Date.now() - 86400000).toISOString().split("T")[0]) ||
//       (dateFilter === "thisWeek" && new Date(sale.date) >= new Date(Date.now() - 7 * 86400000))

//     const matchesPayment = paymentFilter === "all" || sale.paymentMethod === paymentFilter

//     return matchesSearch && matchesDate && matchesPayment
//   })

//   // Get unique categories for filter
//   const categories = [...new Set(products.filter((p) => p && p.category).map((product) => product.category))]

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         isMobile={isMobile}
//       />

//       <div
//         className={`flex-1 flex flex-col transition-all duration-300 ${
//           !isMobile && sidebarOpen ? "ml-64" : !isMobile && !sidebarOpen ? "ml-20" : "ml-0"
//         }`}
//       >
//         <Header
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           showLowStockNotification={showLowStockNotification}
//           setActiveTab={setActiveTab}
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />

//         <main className="p-3 md:p-6 overflow-auto">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <>
//               {activeTab === "dashboard" && (
//                 <div className="space-y-4 md:space-y-6">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                     <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
//                     <div className="flex items-center gap-2">
//                       <div className="relative">
//                         <button
//                           className="flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//                           onClick={() => {
//                             const newPeriod =
//                               chartPeriod === "week" ? "month" : chartPeriod === "month" ? "year" : "week"
//                             setChartPeriod(newPeriod)
//                           }}
//                         >
//                           {chartPeriod === "week" ? "This Week" : chartPeriod === "month" ? "This Month" : "This Year"}{" "}
//                           <FaChevronDown className="ml-2 h-4 w-4" />
//                         </button>
//                       </div>
//                       <button
//                         className="flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                         onClick={() => setIsSaleDialogOpen(true)}
//                       >
//                         <FaPlus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
//                         <span className="hidden xs:inline">New Sale</span>
//                         <span className="xs:hidden">Sale</span>
//                       </button>
//                     </div>
//                   </div>

//                   <DashboardCards
//                     totalRevenue={dashboardStats.totalRevenue || 0}
//                     totalSales={dashboardStats.totalSales || 0}
//                     totalProducts={dashboardStats.totalProducts || 0}
//                     lowStockProducts={dashboardStats.lowStockProducts || 0}
//                     sales={sales || []}
//                     products={products || []}
//                   />

//                   {sales.length > 0 ? (
//                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//                       <div className="col-span-full md:col-span-4 bg-white p-3 md:p-4 rounded-lg shadow">
//                         <div className="mb-3 md:mb-4">
//                           <h2 className="text-base md:text-lg font-medium">Sales Overview</h2>
//                         </div>
//                         <div className="pl-0 md:pl-2 h-[300px] md:h-[350px]">
//                           <SalesChart salesData={salesChartData} period={chartPeriod} />
//                         </div>
//                       </div>
//                       <div className="col-span-full md:col-span-3 bg-white p-3 md:p-4 rounded-lg shadow">
//                         <div className="mb-3 md:mb-4">
//                           <h2 className="text-base md:text-lg font-medium">Stock Levels</h2>
//                           <p className="text-xs md:text-sm text-gray-500">Products with low stock</p>
//                         </div>
//                         <div className="h-[250px] md:h-[300px]">
//                           <StockChart products={stockChartData.length > 0 ? stockChartData : products.slice(0, 5)} />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="bg-white p-4 md:p-6 rounded-lg shadow">
//                       <div className="mb-4">
//                         <h2 className="text-lg font-medium">Getting Started</h2>
//                         <p className="text-sm text-gray-500">
//                           Start by adding products to your inventory and recording sales
//                         </p>
//                       </div>
//                       <div className="flex flex-col gap-4">
//                         <div className="flex flex-col gap-2">
//                           <h3 className="text-base md:text-lg font-medium">1. Add Products</h3>
//                           <p className="text-sm text-gray-500">
//                             Go to the Inventory tab and add your products with their details.
//                           </p>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <h3 className="text-base md:text-lg font-medium">2. Record Sales</h3>
//                           <p className="text-sm text-gray-500">
//                             Use the "New Sale" button to record transactions when you sell products.
//                           </p>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <h3 className="text-base md:text-lg font-medium">3. Monitor Dashboard</h3>
//                           <p className="text-sm text-gray-500">
//                             Track your sales and inventory levels from this dashboard.
//                           </p>
//                         </div>
//                         <div className="flex justify-center mt-4">
//                           <button
//                             className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                             onClick={() => setActiveTab("inventory")}
//                           >
//                             <FaPlus className="mr-2 h-4 w-4" /> Add Your First Product
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {sales.length > 0 && (
//                     <SalesTable
//                       sales={sales}
//                       filteredSales={filteredSales}
//                       dateFilter={dateFilter}
//                       paymentFilter={paymentFilter}
//                       setDateFilter={setDateFilter}
//                       setPaymentFilter={setPaymentFilter}
//                       searchTerm={searchTerm}
//                       isMobile={isMobile}
//                       onViewDetails={handleViewSaleDetails}
//                       onDeleteSale={handleDeleteSale}
//                       onSearchChange={setSearchTerm}
//                     />
//                   )}
//                 </div>
//               )}

//               {activeTab === "inventory" && (
//                 <div className="space-y-4 md:space-y-6">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                     <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inventory Management</h1>
//                     <button
//                       className="flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full md:w-auto justify-center md:justify-start"
//                       onClick={() => setIsProductDialogOpen(true)}
//                     >
//                       <FaPlus className="mr-2 h-4 w-4" /> Add Product
//                     </button>
//                   </div>

//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
//                     <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
//                       <input
//                         type="text"
//                         placeholder="Search products..."
//                         className="w-full md:w-[250px] px-3 py-2 border border-gray-300 rounded-md"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                       <div className="relative w-full md:w-auto">
//                         <select
//                           className="w-full md:w-auto appearance-none flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//                           value={categoryFilter}
//                           onChange={(e) => setCategoryFilter(e.target.value)}
//                         >
//                           <option value="all">All Categories</option>
//                           {categories.map((category) => (
//                             <option key={category} value={category}>
//                               {category}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="relative w-full md:w-auto">
//                         <select
//                           className="w-full md:w-auto appearance-none flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//                           value={stockFilter}
//                           onChange={(e) => setStockFilter(e.target.value)}
//                         >
//                           <option value="all">All Stock</option>
//                           <option value="inStock">In Stock</option>
//                           <option value="lowStock">Low Stock</option>
//                           <option value="critical">Critical Stock</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <InventoryTable
//                     products={products}
//                     filteredProducts={filteredProducts}
//                     handleEditProduct={handleEditProduct}
//                     setEditingProduct={setEditingProduct}
//                     setIsEditDialogOpen={setIsEditDialogOpen}
//                     handleDeleteProduct={handleDeleteProduct}
//                     onViewDetails={handleViewProductDetails}
//                     isMobile={isMobile}
//                   />
//                 </div>
//               )}

//               {activeTab === "sales" && (
//                 <div className="space-y-4 md:space-y-6">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                     <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Sales Management</h1>
//                     <button
//                       className="flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full md:w-auto justify-center md:justify-start"
//                       onClick={() => setIsSaleDialogOpen(true)}
//                     >
//                       <FaPlus className="mr-2 h-4 w-4" /> New Sale
//                     </button>
//                   </div>

//                   <SalesTable
//                     sales={sales}
//                     filteredSales={filteredSales}
//                     dateFilter={dateFilter}
//                     paymentFilter={paymentFilter}
//                     setDateFilter={setDateFilter}
//                     setPaymentFilter={setPaymentFilter}
//                     searchTerm={searchTerm}
//                     isMobile={isMobile}
//                     onViewDetails={handleViewSaleDetails}
//                     onDeleteSale={handleDeleteSale}
//                     onSearchChange={setSearchTerm}
//                   />
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>

//       {/* Product Dialog */}
//       {isProductDialogOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Add New Product</h2>
//                 <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsProductDialogOpen(false)}>
//                   ✕
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">Enter the details of the new product to add to inventory.</p>
//               <ProductForm
//                 newProduct={newProduct}
//                 setNewProduct={setNewProduct}
//                 handleAddProduct={handleAddProduct}
//                 onSuccess={() => setIsProductDialogOpen(false)}
//                 isMobile={isMobile}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sale Dialog */}
//       {isSaleDialogOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Record New Sale</h2>
//                 <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsSaleDialogOpen(false)}>
//                   ✕
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">Enter the details of the new sale transaction.</p>
//               <SaleForm
//                 products={products}
//                 onAddSale={handleAddSale}
//                 onSuccess={() => setIsSaleDialogOpen(false)}
//                 isMobile={isMobile}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Product Dialog */}
//       {isEditDialogOpen && editingProduct && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Edit Product</h2>
//                 <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsEditDialogOpen(false)}>
//                   ✕
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">Update the details of the product.</p>
//               <ProductForm
//                 newProduct={editingProduct}
//                 setNewProduct={(updatedProduct) => setEditingProduct(updatedProduct)}
//                 handleAddProduct={handleEditProduct}
//                 onSuccess={() => setIsEditDialogOpen(false)}
//                 isMobile={isMobile}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Details Dialog */}
//       {selectedProduct && (
//         <ProductDetailsDialog
//           product={selectedProduct}
//           isOpen={isProductDetailsOpen}
//           setIsOpen={setIsProductDetailsOpen}
//         />
//       )}

//       {/* Sale Details Dialog */}
//       {selectedSale && (
//         <SaleDetailsDialog
//           sale={selectedSale}
//           isOpen={isSaleDetailsOpen}
//           setIsOpen={setIsSaleDetailsOpen}
//           isMobile={isMobile}
//           onDeleteSale={handleDeleteSale}
//         />
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useEffect, useRef } from "react"
import { FaPlus, FaTrash, FaExclamationCircle, FaChevronDown } from "react-icons/fa"

export default function SaleForm({ products, onAddSale, onSuccess, isMobile }) {
  const [newSale, setNewSale] = useState({
    items: [
      { productId: "", productName: "", quantity: 1, purchasePrice: 0, salePrice: 0, unit: "count", availableStock: 0 },
    ],
    paymentMethod: "Cash",
  })

  const [validationErrors, setValidationErrors] = useState([])
  const [hasStockError, setHasStockError] = useState(false)
  const [productDropdownOpen, setProductDropdownOpen] = useState(null)
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false)

  // Refs for handling outside clicks
  const dropdownRefs = useRef([])
  const paymentDropdownRef = useRef(null)

  // Filter out invalid products
  const validProducts = Array.isArray(products)
    ? products.filter((product) => product && product._id && product.name && product.stock >= 0)
    : []

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Close product dropdowns
      if (
        productDropdownOpen !== null &&
        dropdownRefs.current[productDropdownOpen] &&
        !dropdownRefs.current[productDropdownOpen].contains(event.target)
      ) {
        setProductDropdownOpen(null)
      }

      // Close payment dropdown
      if (paymentDropdownOpen && paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target)) {
        setPaymentDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [productDropdownOpen, paymentDropdownOpen])

  // Validate stock levels whenever items change
  useEffect(() => {
    const errors = []
    let stockError = false

    newSale.items.forEach((item, index) => {
      if (item.productId && item.quantity > item.availableStock) {
        errors.push(
          `Item ${index + 1}: ${item.productName} - Requested quantity (${item.quantity}) exceeds available stock (${
            item.availableStock
          })`,
        )
        stockError = true
      }
    })

    setValidationErrors(errors)
    setHasStockError(stockError)
  }, [newSale.items])

  const handleAddSaleItem = () => {
    setNewSale({
      ...newSale,
      items: [
        ...newSale.items,
        {
          productId: "",
          productName: "",
          quantity: 1,
          purchasePrice: 0,
          salePrice: 0,
          unit: "count",
          availableStock: 0,
        },
      ],
    })
  }

  const handleRemoveSaleItem = (index) => {
    const items = [...newSale.items]
    items.splice(index, 1)
    setNewSale({ ...newSale, items })
  }

  const handleUpdateSaleItem = (index, field, value) => {
    const items = [...newSale.items]

    if (field === "productId") {
      const product = validProducts.find((p) => p._id === value)
      if (product) {
        items[index] = {
          ...items[index],
          productId: value,
          productName: product.name,
          purchasePrice: product.purchasePrice,
          salePrice: product.salePrice,
          unit: product.unit || "count",
          availableStock: product.stock,
        }
      }
    } else if (field === "quantity") {
      // Get the current item
      const currentItem = items[index]

      // Ensure quantity is not negative
      let newQuantity = Math.max(0, value)

      // Ensure quantity doesn't exceed available stock
      if (currentItem.productId && currentItem.availableStock !== undefined) {
        newQuantity = Math.min(newQuantity, currentItem.availableStock)
      }

      items[index] = { ...items[index], quantity: newQuantity }
    } else {
      items[index] = { ...items[index], [field]: value }
    }

    setNewSale({ ...newSale, items })
  }

  const validateForm = () => {
    const errors = []

    // Check if any items are selected
    if (newSale.items.length === 0) {
      errors.push("Please add at least one item to the sale")
    }

    // Check if all items have a product selected
    newSale.items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Please select a product`)
      }

      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be greater than 0`)
      }

      if (item.productId && item.quantity > item.availableStock) {
        errors.push(
          `Item ${index + 1}: ${item.productName} - Requested quantity (${item.quantity}) exceeds available stock (${
            item.availableStock
          })`,
        )
      }
    })

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = () => {
    // Validate the form
    if (!validateForm()) {
      return
    }

    // Only proceed if there are no stock errors
    if (!hasStockError) {
      // Remove availableStock from items before submitting
      const submitItems = newSale.items.map(({ availableStock, ...item }) => item)
      onAddSale({
        ...newSale,
        items: submitItems,
      })

      // Reset form after successful submission
      setNewSale({
        items: [
          {
            productId: "",
            productName: "",
            quantity: 1,
            purchasePrice: 0,
            salePrice: 0,
            unit: "count",
            availableStock: 0,
          },
        ],
        paymentMethod: "Cash",
      })

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    }
  }

  // Update refs array when items change
  useEffect(() => {
    dropdownRefs.current = dropdownRefs.current.slice(0, newSale.items.length)
  }, [newSale.items.length])

  return (
    <div className="grid gap-4 py-4">
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <FaExclamationCircle className="h-4 w-4 mr-2" />
            <span className="font-bold">Validation Errors</span>
          </div>
          <ul className="list-disc pl-5 mt-2">
            {validationErrors.map((error, index) => (
              <li key={`error-${index}`}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Products</label>
        {newSale.items.map((item, index) => (
          <div key={`item-${index}`} className={`flex ${isMobile ? "flex-col" : "items-center"} gap-2`}>
            <div className="relative flex-1" ref={(el) => (dropdownRefs.current[index] = el)}>
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md border ${
                  item.productId && item.quantity > item.availableStock ? "border-red-500" : "border-gray-300"
                } bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                onClick={() => setProductDropdownOpen(productDropdownOpen === index ? null : index)}
              >
                {item.productId ? item.productName : "Select product"}
                <FaChevronDown className="ml-2 h-4 w-4" />
              </button>
              {productDropdownOpen === index && (
                <div className="absolute z-[110] mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
                  <div className="py-1">
                    {validProducts.length > 0 ? (
                      validProducts.map((product) => (
                        <button
                          key={`product-${product._id}`}
                          type="button"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleUpdateSaleItem(index, "productId", product._id)
                            setProductDropdownOpen(null)
                          }}
                        >
                          {product.name} - PKR {product.salePrice} ({product.unit || "count"}) - Stock: {product.stock}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No products available</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={`flex ${isMobile ? "w-full" : "w-auto"} items-center gap-2 mt-2 md:mt-0`}>
              <input
                type="number"
                placeholder="Qty"
                className={`${isMobile ? "flex-1" : "w-20"} rounded-md border ${
                  item.productId && item.quantity > item.availableStock ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                value={item.quantity}
                onChange={(e) => handleUpdateSaleItem(index, "quantity", Number(e.target.value))}
                min="0.01"
                max={item.availableStock || 9999}
                step={item.unit === "count" ? "1" : "0.01"}
              />
              {item.productId && (
                <span className="text-xs text-gray-500 whitespace-nowrap">Max: {item.availableStock}</span>
              )}
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={() => handleRemoveSaleItem(index)}
                disabled={newSale.items.length === 1}
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          onClick={handleAddSaleItem}
        >
          <FaPlus className="mr-2 h-4 w-4" /> Add Item
        </button>
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
        <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Payment Method</label>
        <div className={`${isMobile ? "mt-1" : "col-span-3"} relative`} ref={paymentDropdownRef}>
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
          >
            {newSale.paymentMethod}
            <FaChevronDown className="ml-2 h-4 w-4" />
          </button>
          {paymentDropdownOpen && (
            <div className="absolute z-[110] mt-1 w-full rounded-md bg-white shadow-lg">
              <div className="py-1">
                {["Cash", "Card", "Bank Transfer"].map((method) => (
                  <button
                    key={`payment-${method}`}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setNewSale({ ...newSale, paymentMethod: method })
                      setPaymentDropdownOpen(false)
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
        <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Total Amount</label>
        <div className={`${isMobile ? "mt-1" : "col-span-3"} font-medium`}>
          PKR {newSale.items.reduce((sum, item) => sum + item.salePrice * item.quantity, 0).toLocaleString()}
        </div>
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
        <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Estimated Profit</label>
        <div className={`${isMobile ? "mt-1" : "col-span-3"} font-medium text-green-600`}>
          PKR{" "}
          {newSale.items
            .reduce((sum, item) => sum + (item.salePrice - item.purchasePrice) * item.quantity, 0)
            .toLocaleString()}
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={hasStockError || newSale.items.some((item) => !item.productId)}
      >
        Complete Sale
      </button>
    </div>
  )
}








// "use client"

// import { useState, useEffect } from "react"
// import { FaPlus, FaTrash, FaExclamationCircle } from "react-icons/fa"

// export default function SaleForm({ products, onAddSale, onSuccess, isMobile }) {
//   const [newSale, setNewSale] = useState({
//     items: [
//       { productId: "", productName: "", quantity: 1, purchasePrice: 0, salePrice: 0, unit: "count", availableStock: 0 },
//     ],
//     paymentMethod: "Cash",
//   })

//   const [validationErrors, setValidationErrors] = useState([])
//   const [hasStockError, setHasStockError] = useState(false)
//   const [productDropdownOpen, setProductDropdownOpen] = useState(null)
//   const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false)

//   // Validate stock levels whenever items change
//   useEffect(() => {
//     const errors = []
//     let stockError = false

//     newSale.items.forEach((item, index) => {
//       if (item.productId && item.quantity > item.availableStock) {
//         errors.push(
//           `Item ${index + 1}: ${item.productName} - Requested quantity (${item.quantity}) exceeds available stock (${
//             item.availableStock
//           })`,
//         )
//         stockError = true
//       }
//     })

//     setValidationErrors(errors)
//     setHasStockError(stockError)
//   }, [newSale.items])

//   const handleAddSaleItem = () => {
//     setNewSale({
//       ...newSale,
//       items: [
//         ...newSale.items,
//         {
//           productId: "",
//           productName: "",
//           quantity: 1,
//           purchasePrice: 0,
//           salePrice: 0,
//           unit: "count",
//           availableStock: 0,
//         },
//       ],
//     })
//   }

//   const handleRemoveSaleItem = (index) => {
//     const items = [...newSale.items]
//     items.splice(index, 1)
//     setNewSale({ ...newSale, items })
//   }

//   const handleUpdateSaleItem = (index, field, value) => {
//     const items = [...newSale.items]

//     if (field === "productId") {
//       const product = products.find((p) => p.id === value)
//       if (product) {
//         items[index] = {
//           ...items[index],
//           productId: value,
//           productName: product.name,
//           purchasePrice: product.purchasePrice,
//           salePrice: product.salePrice,
//           unit: product.unit,
//           availableStock: product.stock,
//         }
//       }
//     } else if (field === "quantity") {
//       // Ensure quantity is not negative
//       const newQuantity = Math.max(0, value)
//       items[index] = { ...items[index], quantity: newQuantity }
//     } else {
//       items[index] = { ...items[index], [field]: value }
//     }

//     setNewSale({ ...newSale, items })
//   }

//   const handleSubmit = () => {
//     // Only proceed if there are no stock errors
//     if (!hasStockError) {
//       // Remove availableStock from items before submitting
//       const submitItems = newSale.items.map(({ availableStock, ...item }) => item)
//       onAddSale({
//         ...newSale,
//         items: submitItems,
//       })

//       // Reset form after successful submission
//       setNewSale({
//         items: [
//           {
//             productId: "",
//             productName: "",
//             quantity: 1,
//             purchasePrice: 0,
//             salePrice: 0,
//             unit: "count",
//             availableStock: 0,
//           },
//         ],
//         paymentMethod: "Cash",
//       })

//       // Call onSuccess callback if provided
//       if (onSuccess) {
//         onSuccess()
//       }
//     }
//   }

//   return (
//     <div className="grid gap-4 py-4">
//       {validationErrors.length > 0 && (
//         <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//           <div className="flex items-center">
//             <FaExclamationCircle className="h-4 w-4 mr-2" />
//             <span className="font-bold">Validation Errors</span>
//           </div>
//           <ul className="list-disc pl-5 mt-2">
//             {validationErrors.map((error, index) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-700">Products</label>
//         {newSale.items.map((item, index) => (
//           <div key={index} className={`flex ${isMobile ? "flex-col" : "items-center"} gap-2`}>
//             <div className="relative flex-1">
//               <button
//                 type="button"
//                 className={`w-full flex items-center justify-between rounded-md border ${
//                   item.productId && item.quantity > item.availableStock ? "border-red-500" : "border-gray-300"
//                 } bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
//                 onClick={() => setProductDropdownOpen(productDropdownOpen === index ? null : index)}
//               >
//                 {item.productId ? item.productName : "Select product"}
//               </button>
//               {productDropdownOpen === index && (
//                 <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
//                   <div className="py-1">
//                     {products.map((product) => (
//                       <button
//                         key={product.id}
//                         type="button"
//                         className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => {
//                           handleUpdateSaleItem(index, "productId", product.id)
//                           setProductDropdownOpen(null)
//                         }}
//                       >
//                         {product.name} - PKR {product.salePrice} ({product.unit}) - Stock: {product.stock}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className={`flex ${isMobile ? "w-full" : "w-auto"} items-center gap-2 mt-2 md:mt-0`}>
//               <input
//                 type="number"
//                 placeholder="Qty"
//                 className={`${isMobile ? "flex-1" : "w-20"} rounded-md border ${
//                   item.productId && item.quantity > item.availableStock ? "border-red-500" : "border-gray-300"
//                 } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
//                 value={item.quantity}
//                 onChange={(e) => handleUpdateSaleItem(index, "quantity", Number(e.target.value))}
//                 min="0.01"
//                 step={item.unit === "count" ? "1" : "0.01"}
//               />
//               <button
//                 type="button"
//                 className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
//                 onClick={() => handleRemoveSaleItem(index)}
//                 disabled={newSale.items.length === 1}
//               >
//                 <FaTrash className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           className="mt-2 flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
//           onClick={handleAddSaleItem}
//         >
//           <FaPlus className="mr-2 h-4 w-4" /> Add Item
//         </button>
//       </div>
//       <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
//         <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Payment Method</label>
//         <div className={`${isMobile ? "mt-1" : "col-span-3"} relative`}>
//           <button
//             type="button"
//             className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
//           >
//             {newSale.paymentMethod}
//           </button>
//           {paymentDropdownOpen && (
//             <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
//               <div className="py-1">
//                 <button
//                   type="button"
//                   className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => {
//                     setNewSale({ ...newSale, paymentMethod: "Cash" })
//                     setPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Cash
//                 </button>
//                 <button
//                   type="button"
//                   className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => {
//                     setNewSale({ ...newSale, paymentMethod: "Card" })
//                     setPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Card
//                 </button>
//                 <button
//                   type="button"
//                   className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   onClick={() => {
//                     setNewSale({ ...newSale, paymentMethod: "Bank Transfer" })
//                     setPaymentDropdownOpen(false)
//                   }}
//                 >
//                   Bank Transfer
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
//         <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Total Amount</label>
//         <div className={`${isMobile ? "mt-1" : "col-span-3"} font-medium`}>
//           PKR {newSale.items.reduce((sum, item) => sum + item.salePrice * item.quantity, 0).toLocaleString()}
//         </div>
//       </div>
//       <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
//         <label className={`${isMobile ? "" : "text-right"} text-sm font-medium text-gray-700`}>Estimated Profit</label>
//         <div className={`${isMobile ? "mt-1" : "col-span-3"} font-medium text-green-600`}>
//           PKR{" "}
//           {newSale.items
//             .reduce((sum, item) => sum + (item.salePrice - item.purchasePrice) * item.quantity, 0)
//             .toLocaleString()}
//         </div>
//       </div>
//       <button
//         type="button"
//         className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         onClick={handleSubmit}
//         disabled={hasStockError || newSale.items.some((item) => !item.productId)}
//       >
//         Complete Sale
//       </button>
//     </div>
//   )
// }

