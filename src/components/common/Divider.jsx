import React from 'react';

const Divider = ({ color = "border-gray-300", className }) => {
    return (
        <hr className={`border-t ${color}   my-4 ${className}`}/>
    );
};

export default Divider;
