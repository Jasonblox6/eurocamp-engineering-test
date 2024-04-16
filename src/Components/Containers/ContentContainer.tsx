import React, { ReactNode } from 'react';
import './ContentContainer.css'; 

interface ContainerProps {
  children: ReactNode;
}

//Just to create the nice background effect

const ContentContainer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="outer-container">
            <div className="inner-container">
                {children}
            </div>
        </div>
    );
};
    
export default ContentContainer;
