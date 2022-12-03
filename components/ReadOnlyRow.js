import React from "react";
import Button from 'react-bootstrap/Button';
const ReadOnlyRow = ({item}) => {
    return (
        <tr id={item.id}>
                    <td>{item.customerId}</td>
                    <td>{item.productName}</td>
                    <td>{item.atLeast}</td>
                    <td>{item.atMost}</td>
                    <td><Button variant="danger" onClick={()=>deletePreference(item.id)}>Delete preference</Button></td>
                </tr>
    )
}
export default ReadOnlyRow;