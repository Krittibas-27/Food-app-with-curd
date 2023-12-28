import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const UserProfile = () => {
   const storageData = JSON.parse(localStorage.getItem("userLogin"));
   //console.log('storageData-',storageData)
  return (
    <Container>
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <Card body className='p-4 card_position' style={{ marginTop:"0%" }}>
                    <Card.Title className='text-center'>{storageData.username && storageData.username}- Profile Details</Card.Title>
                    <hr/>
                    <Card.Text><strong>Name</strong> : {storageData.username && storageData.username}</Card.Text>
                    <Card.Text><strong>Email</strong> : {storageData.email && storageData.email}</Card.Text>
                    <Card.Text><strong>Phone</strong> : {storageData.phone && storageData.phone}</Card.Text>
                    <Card.Text><strong>Status</strong> : {storageData.status ? "Active" : "Inactive"}</Card.Text>
                    <Card.Text><strong>Gender</strong> : {storageData.gender && storageData.gender}</Card.Text>
                    <Card.Text><strong>Notification</strong> : {storageData.notification ? "Yes": "No"}</Card.Text>
                    <Card.Text><strong>Technology</strong> : 
                    {storageData.technology.length > 0  ? storageData.technology.map((item, i)=>{
                        return (
                            <li key={i} className='inline-block'>{item.label}, </li>
                        )
                    }) : null}
                    </Card.Text>
                    <Card.Text><strong>User Details</strong> : {storageData.details && storageData.details}</Card.Text>
                    <Card.Text><strong>User Full Details</strong> : {storageData.fullDetails && <><span dangerouslySetInnerHTML={{__html: storageData.fullDetails}}></span></>}</Card.Text>
                    <Link variant="primary" className='btn btn-primary' to="/">Go Back</Link>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default UserProfile