import { createContext, useContext, useState } from 'react';

type VisibilityContextType = {
 isVisible: boolean;
 setIsVisible: (value: boolean) => void;
};

export const VisibilityContext = createContext<VisibilityContextType>(
 {} as VisibilityContextType
);

export const useVisibility = () => useContext(VisibilityContext);

export const VisibilityProvider: React.FC = ({ children }: any) => {
 const [isVisible, setIsVisible] = useState(true);

 return (
    <VisibilityContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </VisibilityContext.Provider>
 );
};