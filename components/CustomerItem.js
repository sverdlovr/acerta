import React from "react";

const CustomerItem = ({id, name}) => {
    return (
        <li>
            <p>id: {id}</p>
            <p>name: {name}</p>
        </li>
        
    )
}

export default CustomerItem

