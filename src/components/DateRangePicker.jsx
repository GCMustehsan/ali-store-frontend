"use client"

import { useState, useRef, useEffect } from "react"
import { FaCalendarAlt, FaTimes } from "react-icons/fa"

export default function DateRangePicker({ startDate, endDate, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)
  const dropdownRef = useRef(null)

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update local state when props change
  useEffect(() => {
    setLocalStartDate(startDate)
    setLocalEndDate(endDate)
  }, [startDate, endDate])

  // Apply date filter
  const applyDateFilter = () => {
    onDateChange(localStartDate, localEndDate)
    setIsOpen(false)
  }

  // Clear date filter
  const clearDateFilter = () => {
    setLocalStartDate("")
    setLocalEndDate("")
    onDateChange("", "")
    setIsOpen(false)
  }

  // Format date for display
  const formatDisplayDate = () => {
    if (!startDate && !endDate) return "Date Range"

    if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
    }

    if (startDate) return `From ${new Date(startDate).toLocaleDateString()}`
    if (endDate) return `Until ${new Date(endDate).toLocaleDateString()}`

    return "Date Range"
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 h-4 w-4 text-gray-500" />
          <span className="truncate max-w-[150px]">{formatDisplayDate()}</span>
        </div>
        {(startDate || endDate) && (
          <FaTimes
            className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation()
              clearDateFilter()
            }}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-72 bg-white shadow-lg rounded-md py-2 px-3 border border-gray-200">
          <div className="mb-3">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={localStartDate}
              onChange={(e) => setLocalStartDate(e.target.value)}
              max={localEndDate || undefined}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={localEndDate}
              onChange={(e) => setLocalEndDate(e.target.value)}
              min={localStartDate || undefined}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={clearDateFilter}
            >
              Clear
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={applyDateFilter}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

