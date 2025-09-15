import React from 'react'

const SelectAllCheckbox = ({ selectAll, onToggleSelectAll }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onToggleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Pilih Semua</span>
            </label>
        </div>
    )
}

export default SelectAllCheckbox