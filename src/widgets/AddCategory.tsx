import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
// @ts-ignore
import Api from '../../resources/apis';
import ApplicationContext from "../../resources/ApplicationContext";

type Props = {
    setIsOpen: (isOpen: boolean) => void
    fetchCategories?: () => void
}

type Inputs = {
  categoryName: string,
  categoryDescription: string,
};

const AddCategory: React.FC<Props> = ({setIsOpen, fetchCategories}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const applicationContext = useContext(ApplicationContext);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        // Send data to backend

        applicationContext?.setIsLoading(true);
        await new Api().post_(data, '/api/portal/categories/').then((response: any)=>{
            applicationContext?.setIsLoading(false);
            console.log("Response returned is ... ")
            console.log(response)
            if(response.status==201){
                if(response.data.StatusCode == 200){
                    console.log("Category added successfully.");
                    if(fetchCategories){
                        fetchCategories();
                    }
                }
            }
        }).catch((error: any) => {
          applicationContext?.setIsLoading(false);
            console.log("Error returned is ... ")
            console.log(error)
        })
    }

    console.log(watch("categoryName")) 

    return <div 
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} 
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="w-full max-w-sm min-w-[200px]">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Category name</label>
                    <input {...register("categoryName", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>
                {errors.categoryName && <span>This field is required</span>}

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Description</label>
                    <input {...register("categoryDescription")} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>
                
                {/* errors will return when field validation fails  */}
                
                
                <button type="submit" className="mt-4 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Submit
                </button>
            </form>
          </div>
        </div>
}

export default AddCategory