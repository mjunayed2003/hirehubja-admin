import React, { useState } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { MdOutlineFileUpload, MdClose, MdAdd } from "react-icons/md";
import Education_img from "../../../assets/image/education.jpg";

const CategoriesContent = () => {
    // State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for Category Filter (Job Seeker, Company, Employee)
    const [selectedCategory, setSelectedCategory] = useState("Job Seeker");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Categories Options
    const categoryTypes = ["Job Seeker", "Company", "Employee"];

    // Mock Data (Usually this would come from an API based on selectedCategory)
    const mockData = Array(8).fill({
        title: "Education",
        image: Education_img,
    });

    const handleCategorySelect = (type) => {
        setSelectedCategory(type);
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[700px] relative font-sans">

            {/* --- HEADER SECTION --- */}
            <div className="mb-8">
                <div className="flex justify-between items-center pb-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Categories</h2>
                    <div className="relative">

                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 min-w-[160px] hover:border-green-400 transition shadow-sm"
                        >
                            {selectedCategory}
                            <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 w-[160px] bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                {categoryTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleCategorySelect(type)}
                                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-green-50 transition-colors ${selectedCategory === type ? "text-[#43B948] font-bold bg-green-50/50" : "text-gray-600"
                                            }`}
                                    >
                                        {type}
                                        {selectedCategory === type && <FaCheck size={10} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-dashed border-gray-200 pt-6 gap-4">

                    {/* Dynamic Title based on Selection */}
                    <h3 className="text-2xl font-bold text-gray-800">
                        Categories for <span className="text-[#43B948]">{selectedCategory}</span>
                    </h3>
                    <div className="flex items-center gap-4 w-full md:w-auto relative">


                        {/* Add Category Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-[#43B948] hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition duration-200"
                        >
                            <MdAdd size={20} />
                            <span>Add Category</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- GRID DISPLAY --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockData.map((item, index) => (
                    <div key={index} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-100 transition duration-300 cursor-pointer">
                        {/* Image Wrapper */}
                        <div className="h-44 w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition z-10" />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                            />
                        </div>
                        {/* Card Footer */}
                        <div className="p-4 text-center bg-white relative z-20">
                            <p className="text-sm font-bold text-gray-700 group-hover:text-[#43B948] transition">
                                {item.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{selectedCategory} Category</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODAL / POPUP --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-all">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Add New Category</h3>
                                <p className="text-xs text-gray-500 mt-1">Creating for: <span className="font-semibold text-green-600">{selectedCategory}</span></p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">

                            {/* File Upload Area */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Category Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-green-50 hover:border-green-300 transition cursor-pointer group">
                                    <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                        <MdOutlineFileUpload className="text-gray-400 group-hover:text-[#43B948] text-3xl transition" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 50MB)</p>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Graphic Design"
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-700 text-sm focus:bg-white focus:border-[#43B948] focus:ring-4 focus:ring-green-500/10 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
                                    <input
                                        type="text"
                                        placeholder="Brief description of the category..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-700 text-sm focus:bg-white focus:border-[#43B948] focus:ring-4 focus:ring-green-500/10 outline-none transition"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 px-8 py-6 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-800 transition shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#43B948] hover:bg-green-600 shadow-md shadow-green-200 transition transform active:scale-95"
                            >
                                Save Category
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesContent;