import React, { useState, useEffect } from "react";
import AddVideo from "../widgets/AddVideo";
// @ts-ignore
import Api from '../../resources/apis';
import DeleteVideo from "../widgets/DeleteVideo";

type Category = {
    categoryId: Number,
    name: string,
    description: string
}

type Language = {
    languageId: Number,
    name: string,
    code: string
}

type Video = {
    videoLogId: Number,
    title: string,
    description: string,
    category: Category,
    language: Language,
    videoFile: string,
    created_at: string,
    updated_at: string
}

const Videos: React.FC = () => {
    const [showAddVideoModal, setShowAddVideoModal] = React.useState<boolean>(false);
    const [videos, setVideos] = useState<Array<Video>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [languages, setLanguages] = useState<Array<Language>>([]);
    
    const [showDeleteVideoModal, setShowDeleteVideoModal] = useState<boolean>(false);
    const [selectedVideoId, setSelectedVideoId] = useState<string>("");

    useEffect(() => {
        // Fetch categories from backend when component mounts
        console.log("Fetching items...");
        fetchVideos();
        fetchCategories();
        fetchLanguages();
    }, []);

    const setVideoModal = (state: boolean) => {
        // Logic to set modal state
        setShowAddVideoModal(state);
    }

    const setDeleteVideoModal = (state: boolean) => {
        setShowDeleteVideoModal(state);
    }

    const fetchVideos = async () => {
        setVideoModal(false);
        try {
            console.log("Fetching videos...");
            const response = await new Api().get_('/api/portal/videos/');
            console.log("Fetched videos: ", response);
            // Handle the fetched categories (e.g., set state)
            if(response.status==200){
                if(response.data.StatusCode == 200){
                    console.log("Videos fetched successfully.");

                    const videos_ = response.data.Result;
                    console.log("Videos data: ", videos_);
                    setVideos(videos_);
                }
            }
        } catch (error) {
            console.error("Error fetching videos: ", error);
        }
    }

    const fetchCategories = async () => {
        try {
            console.log("Fetching categories...");
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

    const fetchLanguages = async () => {
        try {
            console.log("Fetching languages...");
            const response = await new Api().get_('/api/portal/languages/');
            console.log("Fetched languages: ", response);
            // Handle the fetched categories (e.g., set state)
            if(response.status==200){
                if(response.data.StatusCode == 200){
                    console.log("Languages fetched successfully.");

                    const languages_ = response.data.Result;
                    console.log("Languages data: ", languages_);
                    setLanguages(languages_);
                }
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }

    return <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-16">
                            <div onClick={()=>setShowAddVideoModal(true)} className="inline-block p-6 bg-gray-50 rounded-full mb-6 cursor-pointer hover:bg-gray-300 hover:scale-110 transition-all duration-200">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium text-gray-700 mb-2">{ videos.length > 0 ? `You have ${videos.length} videos` : "No content yet" }</h3>
                            { videos.length > 0 ? null : <p className="text-gray-500 mb-8">Get started by adding videos</p> }
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                                {
                                    videos.length > 0 ? videos.map((video) => (
                                        <div key={video.videoLogId.toString()} className="border-2 border-gray-200 rounded-lg p-8 flex flex-col items-start">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h4>
                                            <p className="text-gray-600 mb-4">{video.description}</p>
                                            <p className="text-sm text-gray-500 mb-4">Category: {video.category.name}</p>
                                            <p className="text-sm text-gray-500 mb-4">Language: {video.language.name}</p>
                                            <video width="100%" height="auto" controls>
                                                <source src={'http://localhost:8000/media/'+video.videoFile} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>{setSelectedVideoId(video.videoLogId.toString()); setDeleteVideoModal(true); }}>Delete</button>
                                        </div>
                                    )) : null
                                }
                            </div>
                        </div>
                    </div>
                    { showAddVideoModal ? <AddVideo setIsOpen={setVideoModal} fetchVideos={fetchVideos} categories={categories} languages={languages} /> : null }
                    { showDeleteVideoModal ? <DeleteVideo setIsOpen={setDeleteVideoModal} videoId={selectedVideoId} fetchVideos={fetchVideos} /> : null }
                </div>
}

export default Videos;