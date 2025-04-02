import { FaDollarSign, FaBox, FaExclamationTriangle, FaChartBar } from "react-icons/fa"

export default function DashboardCards({
  totalRevenue,
  totalSales,
  totalProducts,
  lowStockProducts,
  sales = [],
  products = [],
}) {
  return (
    <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
      <div className="bg-white p-3 md:p-6 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-xs md:text-sm font-medium text-gray-500">Total Revenue</h3>
          <FaDollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-lg md:text-2xl font-bold">PKR {totalRevenue?.toLocaleString() || "0"}</div>
        <p className="text-xs text-gray-500">
          {sales && sales.length > 0 ? "+20.1% from last month" : "No previous data"}
        </p>
      </div>
      <div className="bg-white p-3 md:p-6 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-xs md:text-sm font-medium text-gray-500">Total Profit</h3>
          <FaChartBar className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-lg md:text-2xl font-bold text-green-600">
          PKR {sales ? sales.reduce((sum, sale) => sum + (sale.profit || 0), 0).toLocaleString() : "0"}
        </div>
        <p className="text-xs text-gray-500">
          {sales && sales.length > 0 ? "+15.3% from last month" : "No previous data"}
        </p>
      </div>
      <div className="bg-white p-3 md:p-6 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-xs md:text-sm font-medium text-gray-500">Products</h3>
          <FaBox className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-lg md:text-2xl font-bold">{totalProducts || 0}</div>
        <p className="text-xs text-gray-500">
          {totalProducts > 0 ? `${totalProducts} products in inventory` : "No products yet"}
        </p>
      </div>
      <div className="bg-white p-3 md:p-6 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-xs md:text-sm font-medium text-gray-500">Low Stock</h3>
          <FaExclamationTriangle className="h-4 w-4 text-gray-400" />
        </div>
        <div className="text-lg md:text-2xl font-bold">{lowStockProducts?.length || 0}</div>
        <p className="text-xs text-gray-500">
          {lowStockProducts && lowStockProducts.length > 0 ? "Products need restocking" : "All stock levels normal"}
        </p>
      </div>
    </div>
  )
}

