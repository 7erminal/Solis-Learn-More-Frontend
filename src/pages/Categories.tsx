import React, { useEffect, useState } from "react";
import AddCategory from "../widgets/AddCategory";
// @ts-ignore
import Api from '../../resources/apis';
import DeleteCategory from "../widgets/DeleteCategory";

const Categories: React.FC = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<{categoryId: Number, name: string, description: string}>>([]);

    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    useEffect(() => {
        // Fetch categories from backend when component mounts
        console.log("Fetching categories...");
        fetchCategories();
    }, []);

    const setCategoryModal = (state: boolean) => {
        setShowAddCategoryModal(state);
    }

    const setDeleteCategoryModal = (state: boolean) => {
        setShowDeleteCategoryModal(state);
    }

    const fetchCategories = async () => {
        setCategoryModal(false);
        try {
            const response = await new Api().get_('/api/portal/categories/');
            console.log("Fetched categories: ", response);
            // Handle the fetched categories (e.g., set state)
            if(response.status==200){
                if(response.data.StatusCode == 200){
                    console.log("Categories fetched successfully.");

                    const categories_ = response.data.Result;
                    console.log("Categories data: ", categories_);
                    setCategories(categories_);
                }
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }

    return <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-16">
                            <div onClick={()=>setShowAddCategoryModal(true)} className="inline-block p-6 bg-gray-50 rounded-full mb-6 cursor-pointer hover:bg-gray-300 hover:scale-110 transition-all duration-200">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium text-gray-700 mb-2">Add category</h3>
                            { categories.length < 1 ? <h3 className="mt-4 text-2xl font-medium text-gray-700 mb-2">No categories</h3> : null }
                            
                            <div className="gap-6 mt-12">
                                {
                                    categories.length > 0 ? (
                                        <div className="flex flex-col gap-6 mt-12">
                                            {categories.map((category, index) => (
                                                <div key={index} className="border-2 border-gray-200 rounded-lg p-8 flex flex-row items-center justify-between w-full">
                                                    <div className="flex flex-col items-start">
                                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h4>
                                                        <p className="text-gray-600">{category.description}</p>
                                                    </div>
                                                    <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>{setSelectedCategoryId(category.categoryId.toString()); setDeleteCategoryModal(true); }}>Delete</button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 mb-8">Get started by creating categories from the sidebar.</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    { showAddCategoryModal ? <AddCategory setIsOpen={setCategoryModal} fetchCategories={fetchCategories} /> : null }
                    { showDeleteCategoryModal ? <DeleteCategory setIsOpen={setDeleteCategoryModal} categoryId={selectedCategoryId} fetchCategories={fetchCategories} /> : null }
                </div>
}

export default Categories;