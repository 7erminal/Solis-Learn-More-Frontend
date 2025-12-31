import { Link, BrowserRouter as Router } from 'react-router-dom';
import { ApplicationProvider } from '../resources/ApplicationProvider';
import CustomRoutes from './Routes';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './assets/customcss.css'

function App() {
    return (
        <ApplicationProvider>
            <Router>
                <div className='bg-white h-full w-full'>
                    <div className="bg-white text-gray-800 font-sans">
                        <div className="flex h-screen overflow-hidden">
                            <div className="w-1/5 relative">
                                <div className="absolute right-0 top-50 bottom-50 w-px bg-gray-300"></div>
                                
                                <div className="h-full p-6 pr-8 overflow-y-auto flex flex-col">
                                    {/* <h1 className="text-2xl font-bold mb-8 text-gray-800">Dashboard</h1> */}
                                    
                                    <nav className="space-y-2 flex flex-col gap-2 justify-center items-center flex-1">
                                        <Link to="/videos" className="flex items-center p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            Videos
                                        </Link>
                                        
                                        <Link to="/categories" className="flex items-center p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                            </svg>
                                            Categories
                                        </Link>
                                        
                                        {/* <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                            </svg>
                                            Analytics
                                        </a>
                                        
                                        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            User Management
                                        </a>
                                        
                                        <a href="#" className="flex items-center p-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            Settings
                                        </a> */}
                                    </nav>
                                    
                                    {/* <div className="mt-12">
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Activity</h2>
                                        <div className="space-y-3">
                                            <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                                                <span className="font-medium">Video uploaded</span> - 2 hours ago
                                            </div>
                                            <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                                                <span className="font-medium">Category added</span> - 1 day ago
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            
                            <div className="w-4/5">
                                <div className="h-full custom-scrollbar overflow-y-auto">
                                    <header className="sticky top-0 z-10 bg-white  px-8 py-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-800">Solis</h2>
                                            <div className="flex items-center space-x-4">
                                                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                                                    Filter
                                                </button>
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                                    New Content
                                                </button>
                                            </div>
                                        </div>
                                    </header>
                                    
                                    <CustomRoutes />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </ApplicationProvider>
    )
}

export default App
