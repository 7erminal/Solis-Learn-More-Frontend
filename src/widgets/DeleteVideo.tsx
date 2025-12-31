import React from "react";
// @ts-ignore
import Api from '../../resources/apis';

type Props = {
    setIsOpen: (isOpen: boolean) => void
    videoId: string
    fetchVideos?: () => void
}

const DeleteVideo: React.FC<Props> = ({setIsOpen, videoId, fetchVideos}) => {

    const confirmDelete = async (videoId: string) => {
            // Implement the delete logic here
            console.log(`Deleting video with ID: ${videoId}`);
            await new Api().delete_(videoId, '/api/portal/videos').then((response: any)=>{
                console.log("Response returned is ... ")
                console.log(response)
                if(response.status==204){
                    console.log("Video deleted successfully.");
                    if(fetchVideos){
                        fetchVideos();
                    }
                    setIsOpen(false);
                }
            }).catch((error: any) => {
                console.log("Error returned is ... ")
                console.log(error)
            })
        }

    return <div 
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <p className="text-gray-600 mb-6">Do you want to delete this video?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => confirmDelete(videoId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
}

export default DeleteVideo