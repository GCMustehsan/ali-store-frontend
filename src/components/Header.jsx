// "use client"

// import { FaSearch, FaExclamationTriangle, FaBars } from "react-icons/fa"

// export default function Header({
//   searchTerm,
//   setSearchTerm,
//   showLowStockNotification,
//   setActiveTab,
//   sidebarOpen,
//   setSidebarOpen,
// }) {
//   return (
//     <header className="flex h-14 items-center gap-2 md:gap-4 border-b bg-white px-3 md:px-6 shadow-sm">
//       <button className="text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         <FaBars className="h-5 w-5" />
//       </button>
//       <div className="w-full flex-1">
//         <form onSubmit={(e) => e.preventDefault()} className="relative">
//           <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           <input
//             type="search"
//             placeholder="Search..."
//             className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-10 pr-4 text-sm md:text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-2/3 lg:w-1/3"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </form>
//       </div>
//       {showLowStockNotification && (
//         <button className="relative mr-2 p-2 text-red-500 hover:text-red-700" onClick={() => setActiveTab("inventory")}>
//           <FaExclamationTriangle className="h-5 w-5" />
//           <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
//         </button>
//       )}
//     </header>
//   )
// }

"use client"

import { FaSearch, FaExclamationTriangle, FaBars } from "react-icons/fa"

export default function Header({
  searchTerm,
  setSearchTerm,
  showLowStockNotification,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <header className="flex h-14 items-center gap-2 md:gap-4 border-b bg-white px-3 md:px-6 shadow-sm">
      <button
        className="text-gray-500 hover:text-gray-700 hidden md:block"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars className="h-5 w-5" />
      </button>
      <div className="w-full flex-1">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-10 pr-4 text-sm md:text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-2/3 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      {showLowStockNotification && (
        <button className="relative mr-2 p-2 text-red-500 hover:text-red-700" onClick={() => setActiveTab("inventory")}>
          <FaExclamationTriangle className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      )}
    </header>
  )
}

