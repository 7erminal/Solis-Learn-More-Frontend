import { type Dispatch, type SetStateAction, createContext } from 'react';

type ApplicationContextProps = {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(undefined);

export default ApplicationContext;