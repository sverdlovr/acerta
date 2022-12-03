import React from "react";
import Button from 'react-bootstrap/Button';
const EditRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (

    <div>
        <tr>
        <td>
            <input
                type="number"
                name="atLeast"
                required="required"
                placeholder="Enter Max Min number"
                value={editFormData.atLeast}
                onChange={handleEditFormChange}
            />
        </td>
        <td>
            <input
                type="number"
                name="atMost"
                required="required"
                placeholder="Enter min Number"
                value={editFormData.atMost}
                onChange={handleEditFormChange}
            />
        </td>
        <td>
            <Button variant="outline-primary" type="submit">Save</Button>
            <Button variant="outline-primary" onClick={handleCancelClick}>Cancel</Button>
        </td>
        
        </tr>
    </div>
    )
}

export default EditRow