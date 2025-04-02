// import axios from "axios"

// const API_URL = "http://localhost:5000/api"

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Product API calls
// export const productAPI = {
//   getAll: async () => {
//     const response = await api.get("/products")
//     return response.data.data
//   },

//   getById: async (id) => {
//     const response = await api.get(`/products/${id}`)
//     return response.data.data
//   },

//   create: async (productData) => {
//     const response = await api.post("/products", productData)
//     return response.data.data
//   },

//   update: async (id, productData) => {
//     const response = await api.put(`/products/${id}`, productData)
//     return response.data.data
//   },

//   delete: async (id) => {
//     const response = await api.delete(`/products/${id}`)
//     return response.data
//   },

//   getLowStock: async () => {
//     const response = await api.get("/products/low-stock")
//     return response.data.data
//   },
// }

// // Sale API calls
// export const saleAPI = {
//   getAll: async () => {
//     const response = await api.get("/sales")
//     return response.data.data
//   },

//   getById: async (id) => {
//     const response = await api.get(`/sales/${id}`)
//     return response.data.data
//   },

//   create: async (saleData) => {
//     const response = await api.post("/sales", saleData)
//     return response.data.data
//   },

//   delete: async (id) => {
//     const response = await api.delete(`/sales/${id}`)
//     return response.data
//   },

//   getByDateRange: async (startDate, endDate) => {
//     const response = await api.get(`/sales/date-range?startDate=${startDate}&endDate=${endDate}`)
//     return response.data.data
//   },

//   getToday: async () => {
//     const response = await api.get("/sales/today")
//     return response.data.data
//   },
// }

// // Dashboard API calls
// export const dashboardAPI = {
//   getStats: async () => {
//     const response = await api.get("/dashboard/stats")
//     return response.data.data
//   },

//   getSalesChartData: async (period = "week") => {
//     const response = await api.get(`/dashboard/sales-chart?period=${period}`)
//     return response.data.data
//   },

//   getStockChartData: async () => {
//     const response = await api.get("/dashboard/stock-chart")
//     return response.data.data
//   },

//   getCategoryDistribution: async () => {
//     const response = await api.get("/dashboard/category-distribution")
//     return response.data.data
//   },
// }

// export default api

import axios from "axios"

const API_URL = "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Product API calls
export const productAPI = {
  getAll: async () => {
    const response = await api.get("/products")
    return response.data.data
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data.data
  },

  create: async (productData) => {
    const response = await api.post("/products", productData)
    return response.data.data
  },

  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data.data
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  getLowStock: async () => {
    const response = await api.get("/products/low-stock")
    return response.data.data
  },
}

// Sale API calls
export const saleAPI = {
  getAll: async () => {
    const response = await api.get("/sales")
    return response.data.data
  },

  getById: async (id) => {
    const response = await api.get(`/sales/${id}`)
    return response.data.data
  },

  create: async (saleData) => {
    const response = await api.post("/sales", saleData)
    return response.data.data
  },

  update: async (id, saleData) => {
    const response = await api.put(`/sales/${id}`, saleData)
    return response.data.data
  },

  delete: async (id) => {
    const response = await api.delete(`/sales/${id}`)
    return response.data
  },

  getByDateRange: async (startDate, endDate) => {
    const response = await api.get(`/sales/date-range?startDate=${startDate}&endDate=${endDate}`)
    return response.data.data
  },

  getToday: async () => {
    const response = await api.get("/sales/today")
    return response.data.data
  },
}

// Dashboard API calls
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get("/dashboard/stats")
    return response.data.data
  },

  getSalesChartData: async (period = "week") => {
    const response = await api.get(`/dashboard/sales-chart?period=${period}`)
    return response.data.data
  },

  getStockChartData: async () => {
    const response = await api.get("/dashboard/stock-chart")
    return response.data.data
  },

  getCategoryDistribution: async () => {
    const response = await api.get("/dashboard/category-distribution")
    return response.data.data
  },
}

export default api

