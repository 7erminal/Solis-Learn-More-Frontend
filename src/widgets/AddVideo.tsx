import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
// @ts-ignore
import Api from '../../resources/apis';
import ApplicationContext from "../../resources/ApplicationContext";

type Props = {
    setIsOpen: (isOpen: boolean) => void
    fetchVideos?: () => void
    categories?: Array<{categoryId: Number, name: string, description: string}>
    languages?: Array<{languageId: Number, name: string, code: string}>
}

type Inputs = {
    title: string,
    description: string,
    videoFile: FileList,
    category: number,
    language: number,
};

const AddVideo: React.FC<Props> = ({setIsOpen, fetchVideos, languages, categories}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const applicationContext = useContext(ApplicationContext);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        // Send data to backend

        var formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        // Get the first file from FileList
        formData.append("videoFile", data.videoFile[0]);
        formData.append("category", data.category.toString());
        formData.append("language", data.language.toString());

        formData.append("timestamp", "120"); 

        applicationContext?.setIsLoading(true);
        await new Api().postMultipart_(formData, '/api/portal/videos/').then((response: any)=>{
            applicationContext?.setIsLoading(false);
            console.log("Response returned is ... ")
            console.log(response)
            if(response.status==201){
                if(response.data.StatusCode == 200){
                    console.log("Video added successfully.");
                    if(fetchVideos){
                        fetchVideos();
                    }
                }
            }
        }).catch((error: any) => {
            applicationContext?.setIsLoading(false);
            console.log("Error returned is ... ")
            console.log(error)
        })
    }
    

    return <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-4">Add Video</h2>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="w-full max-w-sm min-w-[200px]">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Video title</label>
                    <input {...register("title", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>
                {errors.title && <span>This field is required</span>}

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Description</label>
                    <input {...register("description", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Video File</label>
                    <input type="file" {...register("videoFile", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Category</label>
                    <select {...register("category", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" >
                        <option value="">Select a category</option>
                        { categories && categories.map((category) => (
                            <option key={category.categoryId.toString()} value={category.categoryId.toString()}>{category.name}</option>
                        )) }
                    </select>
                </div>

                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Language</label>
                    <select {...register("language", { required: true })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" >
                        <option value="">Select a language</option>
                        { languages && languages.map((language) => (
                            <option key={language.languageId.toString()} value={language.languageId.toString()}>{language.name}</option>
                        )) }
                    </select>
                </div>
                
                {/* errors will return when field validation fails  */}
                
                
                <button type="submit" className="mt-4 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Submit
                </button>
            </form>
          </div>
        </div>
}

export default AddVideo