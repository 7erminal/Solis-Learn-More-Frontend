import React, { type ReactNode } from "react";
import ApplicationContext from './ApplicationContext';
// import { Hospital, Institution } from "../../utils/types/Types";

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return <ApplicationContext.Provider value={
    {
      isLoading,
      setIsLoading,
    }
  }>
    {children}
  </ApplicationContext.Provider>
}