import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import LoadingOverlay from "./widgets/LoadingOverlay";
import Categories from "./pages/Categories";
import Videos from "./pages/Videos";
import ApplicationContext from "../resources/ApplicationContext";
// import ActivityTracker from "./resources/ActivityTracker.tsx";
// import ApplicationContext from './resources/contexts/ApplicationContext';
// import NotififcationModal from "./components/NotificationModal.tsx";
// import Loading from "./widgets/Loading.tsx";



const CustomRoutes: React.FC = () => {
    const applicationContext = useContext(ApplicationContext);

    return <AnimatePresence>
                <Routes>
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                    {/* <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} /> */}
                    <Route path='/' element={<Videos />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/videos' element={<Videos />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
                {/* <Invoice showModal={showInvoice} handleClose={handleShowInvoiceModalClose} invoice={selectedInvoice} />
                <NotififcationModal notificationProps={appContext!.notificationProps!} />
                <Loading show={systemContext?.loading} handleClose={appContext!.handleLoadingClose} /> */}
                {applicationContext?.isLoading ? <LoadingOverlay /> : null}
            </AnimatePresence>
}

export default CustomRoutes;