import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const SingleUserView = () => {
    const {state}= useLocation()
    const {singleuser} = state
    console.log('singleuser =>', singleuser)
  return (
    <Container>
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <Card body className='p-4 card_position' style={{ marginTop:"0%" }}>
                    <Card.Title className='text-center'>{singleuser.username && singleuser.username} Details</Card.Title>
                    <hr/>
                    <Card.Text><strong>Name</strong> : {singleuser.username && singleuser.username}</Card.Text>
                    <Card.Text><strong>Email</strong> : {singleuser.email && singleuser.email}</Card.Text>
                    <Card.Text><strong>Phone</strong> : {singleuser.phone && singleuser.phone}</Card.Text>
                    <Card.Text><strong>Status</strong> : {singleuser.status ? "Active" : "Inactive"}</Card.Text>
                    <Card.Text><strong>Gender</strong> : {singleuser.gender && singleuser.gender}</Card.Text>
                    <Card.Text><strong>Notification</strong> : {singleuser.notification ? "Yes": "No"}</Card.Text>
                    <Card.Text><strong>Technology</strong> : 
                    {singleuser?.technology?.length > 0  ? singleuser?.technology?.map((item, i)=>{
                        return (
                            <li key={i} className='inline-block'>{item.label}, </li>
                        )
                    }) : null}
                    </Card.Text>
                    <Card.Text><strong>User Details</strong> : {singleuser.details && singleuser.details}</Card.Text>
                    <Card.Text><strong>User Full Details</strong> : {singleuser.fullDetails && <><span dangerouslySetInnerHTML={{__html: singleuser.fullDetails}}></span></>}</Card.Text>
                    <Link variant="primary" className='btn btn-primary' to="/userloginlist">Go Back</Link>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default SingleUserView