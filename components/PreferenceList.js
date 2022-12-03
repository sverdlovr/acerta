import React, {useState, useEffect, Fragment} from "react";
import EditRow from './EditRow'
import Button from 'react-bootstrap/Button';
import {nanoid} from "nanoid";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
const PreferenceList = ({customerId}) => {
    
    const [preferences, setPreferences] = useState();
    
    const getPreferences = async () => { 
        const response = await fetch(`/api/customers/${customerId}`)
        const data = await response.json()  
        setPreferences(data)
    }

    const [editPreferenceId, setEditPreferenceId] = useState(null)
    
    useEffect(() => {  
        getPreferences();
        getProducts();
    }, [])
    
    const deletePreference = async ( preferenceId ) => {
        const response = await fetch(`api/preferences/${preferenceId}`,{
            method: 'DELETE'
        })
        getPreferences() 
        getProducts()
    }   

    const [products, setProducts] = useState(); //fruits for the dopdown

    
    const [addFormData, setAddFromData] = useState({
        customerId: '',
        fruit: '',
        atLeast: '',
        atMost: ''
        
    })
    const [editFormData, setEditFormData] = useState({
        atLeast
        : '',
        atMost: ''
    })

    const handleAddFormChange = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = { ...addFormData }

        newFormData[fieldName] = fieldValue
        setAddFromData(newFormData)
        
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue
        setEditFormData(newFormData)
    }

    const submitPreference = async (event) => {
        event.preventDefault();
        
        const newFruit = {
            id: nanoid(),
            customerId:parseInt(customerId),
            productId: parseInt( addFormData.fruit ),
            atLeast: parseInt( addFormData.atLeast ),
            atMost: parseInt( addFormData.atMost)
        }

        const response = await fetch('api/preferences',{
            method: 'POST',
            body: JSON.stringify({ newFruit }), 
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        getPreferences()       
        getProducts()
    }
    
    const handleEditFormSubmit = async (event) => {
        event.preventDefault()
        const editedPreference = {
            id: editPreferenceId,
            atLeast: editFormData.atLeast,
            atMost: editFormData.atMost
        }
        
        const response = await fetch(`api/preferences/${editPreferenceId}`,{
            method: 'PUT',
            body: JSON.stringify({ editedPreference }), 
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        if(response){
            getPreferences()
            setEditPreferenceId(null)
        }
    }

    //getting the fruits for the dropdown
    const getProducts = async () => { 
        const response = await fetch(`/api/products/${customerId}`)
        const data = await response.json()  
        setProducts(data)
    }

    const handleEditClick = (event, preference) => {
        event.preventDefault()
        setEditPreferenceId(preference.id)

        const formValues = {
            atLeast: preference.atLeast,
            atMost: preference.atMost
        }
        setEditFormData(formValues)
    }

    const handleCancelClick = () => {
        setEditPreferenceId(null)
    }

    return (
        <>
            <form onSubmit={handleEditFormSubmit}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>At Least</th>
                            <th>At Most</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preferences && preferences.map((item, index) => (
                            // eslint-disable-next-line react/jsx-key
                            // eslint-disable-next-line react/jsx-key
                            <Fragment>
                                {editPreferenceId === item.id ? (
                                    <EditRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (

                                    <tr key={index}>
                                        <td>{item.customerId}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.atLeast}</td>
                                        <td>{item.atMost}</td>
                                        <td>
                                            <Button variant="outline-primary" onClick={(event) => handleEditClick(event, item)}>Edit</Button>
                                            <Button variant="danger" onClick={() => deletePreference(item.id)}>Delete</Button>
                                        </td>
                                    </tr>

                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </Table>
            </form>
            <h4>Add New Preference</h4>
            <Form>
            <Row>
                  <Col>
                    
                <Form.Select
                    id="fruit"
                    name="fruit"
                    value={addFormData.fruit}
                    required="required"
                    onChange={handleAddFormChange}
                >
                    <option value="" selected disabled hidden>Select Product</option>
                    {products && products.map((item, index) => (

                        <option value={item.id} key={index}>{item.name}</option>

                    ))}
                </Form.Select>
                  </Col>                  
                <Col>

                <Form.Control
                    type="number"
                    name="atLeast"
                    required="required"
                    placeholder="Min"
                    onChange={handleAddFormChange}
                />
                </Col>
                <Col>
                <Form.Control
                    type="number"
                    name="atMost"
                    required="required"
                    placeholder="Max"
                    onChange={handleAddFormChange}
                />
                </Col>
                    <Button type="submit" onClick={submitPreference}>Submit Preference</Button>
                </Row>
            </Form>
        </>
    )
}

export default PreferenceList
