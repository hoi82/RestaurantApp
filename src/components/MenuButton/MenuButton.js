import React, { forwardRef } from 'react';

function MenuButton({id, className}, ref) {
    const handleClick = (e) => {
        e.stopPropagation();
    }
    
    return (
        <svg id={id} ref={ref} className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" enableBackground="new 0 0 512 512" onClickCapture={handleClick}>
            <circle cx="256" cy="256" r="64"/>
            <circle cx="256" cy="448" r="64"/>
            <circle cx="256" cy="64" r="64"/>                    
        </svg>
    );
}

export default forwardRef(MenuButton);