import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUser } from '../reduxtoolkit/actions/LoginAction'
import SpinnerComponent from '../components/SpinnerComponent'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserLoginList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isError, allUserData, message } = useSelector(state => state.loginUsers)
    const [query, setQuery] = useState("")
    
    const viewSingleUser = (uData) => {
        navigate(`/userloginlist/${uData.id}`, {
            state: { singleuser: uData }
        })
    }
    const deleteSingleUser = (id) => {
        dispatch(deleteUser(id)).then((res) => {
            if (res.type ==="user/delete/fulfilled") {
                toast.success("User deleted", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(getAllUser())
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const editSingleUser=(eData)=>{
        navigate(`/userloginlist/edit/${eData.id}`,{
            state: {editData : eData}
        })
    }
    const resetSearch = () => {
        setQuery("");
    };
    const searchUserListing=(user)=>{
        return user.filter((ele)=>{
            return ele.username.toLowerCase().includes(query.toLowerCase()) || 
            ele.email.toLowerCase().includes(query.toLowerCase()) || 
            String(ele.phone).includes(query) 
        })
    } 
    useEffect(() => {
        dispatch(getAllUser())
    }, [])
    
    //console.log(allUserData)
    return (
        <div className='my-4'>
            <Container>
                <div className='p-4 bg-dark'>
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4, offset: 4 }}>
                            <Form.Control size='md' type="text" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <Button size='md' variant="secondary" onClick={()=>resetSearch()}>Reset</Button>
                        </Col>
                    </Row>
                </div>
                <Table striped bordered hover variant="dark" responsive className="justify-content-center items-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr><td colSpan={7}><SpinnerComponent /></td></tr> :
                                isError ? <tr><td colSpan={7}><h3 className='text-center text-primary'>{message}</h3></td></tr> :
                                searchUserListing(allUserData).length === 0 ? 
                                <tr><td colSpan={7}><h4 className='text-center text-white p-4'>User not found</h4></td></tr> : 
                                searchUserListing(allUserData).map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.username ? user.username : '-'}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone ? user.phone : '-'}</td>
                                                <td className='text-capitalize'>{user.gender ? user.gender : '-'}</td>
                                                <td style={user.status ? { color: "#1fae44" } : { color: "#d86c6c" }}>{user.status ? "Active" : "Inactive"}</td>
                                                <td>
                                                    <Button size="sm" variant="primary" className='m-1' onClick={() => viewSingleUser(user)}>View</Button>
                                                    <Button size="sm" variant="success" className='m-1' onClick={() => editSingleUser(user)}>Edit</Button>
                                                    <Button size="sm" variant="danger" className='m-1' onClick={() => deleteSingleUser(user.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default UserLoginList