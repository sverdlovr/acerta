import React, { useEffect, useState } from "react";
import CustomerItem from "./CustomerItem";
import ReadOnlyRow from "./ReadOnlyRow";

import ModalDialog from './ModalDialog'


const CustomerList = () => {
    
    const [data, setData] = useState();

    const getCustomers = async () => {
        const response = await fetch('api/customers')
        const data = await response.json()
        setData(data) 
    }

    useEffect(() => {
        getCustomers()
    }, [])

    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Preference</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <tr id={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><ModalDialog customerId={item.id}/></td>
                    {/* <td><button onClick={()=>setOpenModal(true)}>Preferences</button></td> */}
                </tr>
                          
            ))}
            </tbody>
        </table>
    </div>
    )
}

export default CustomerList;