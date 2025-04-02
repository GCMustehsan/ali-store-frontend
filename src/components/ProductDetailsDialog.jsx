"use client"

export default function ProductDetailsDialog({ product, isOpen, setIsOpen }) {
  if (!product || !isOpen) return null

  const profitMargin =
    product.purchasePrice > 0
      ? (((product.salePrice - product.purchasePrice) / product.purchasePrice) * 100).toFixed(2)
      : "0"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Product Details</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">ID: {product.id}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Name:</div>
                <div>{product.name}</div>
                <div className="font-medium">Category:</div>
                <div>{product.category}</div>
                <div className="font-medium">Status:</div>
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
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Inventory</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Current Stock:</div>
                <div>
                  {product.stock} {product.unit}
                </div>
                <div className="font-medium">Purchase Price:</div>
                <div>PKR {product.purchasePrice.toLocaleString()}</div>
                <div className="font-medium">Sale Price:</div>
                <div>PKR {product.salePrice.toLocaleString()}</div>
                <div className="font-medium">Profit per Unit:</div>
                <div className="text-green-600">PKR {(product.salePrice - product.purchasePrice).toLocaleString()}</div>
                <div className="font-medium">Profit Margin:</div>
                <div className="text-green-600">{profitMargin}%</div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-500">Inventory Value</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="text-gray-500 mb-1">Purchase Value</div>
                <div className="text-xl font-bold">PKR {(product.purchasePrice * product.stock).toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="text-gray-500 mb-1">Sale Value</div>
                <div className="text-xl font-bold">PKR {(product.salePrice * product.stock).toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="text-gray-500 mb-1">Potential Profit</div>
                <div className="text-xl font-bold text-green-600">
                  PKR {((product.salePrice - product.purchasePrice) * product.stock).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

