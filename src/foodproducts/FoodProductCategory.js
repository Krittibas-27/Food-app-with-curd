import React, { useEffect, useState } from 'react'
import {getFoolCategory} from "../reduxtoolkit/actions/FoodAction"
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Container, Form, Row} from 'react-bootstrap'
import SpinnerComponent from "../components/SpinnerComponent"
import ViewCategoryModal from './ViewCategoryModal'

const FoodProductCategory = () => {
  const dispatch = useDispatch()
  const {foodCategoryList, isLoading, isError, message} = useSelector(state=> state.food)
  const [viewSingleModal, setViewSingleModal] = useState(false)
  const [viewSingleCategory, setSingleCategory] = useState({})
  const [query, setQuery] = useState("")

  const singleCategory=(data)=>{
    //console.log(data)
    setViewSingleModal(true)
    setSingleCategory(data)
  }
  //console.log(viewSingleCategory)
  const searchCategory=(ele)=>{
     return ele.filter((item)=>{
      return item.strCategory.toLowerCase().includes(query.toLowerCase())
    })
  }
  const resetSearch = () => {
    setQuery("");
  };
  useEffect(() => {
    dispatch(getFoolCategory())
  }, [])
  
  return (
    <>
        <div className='slider_bg'>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 4, offset: 4 }}>
                      <Form.Control size='lg' type="text" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                    </Col>
                    <Col md={{ span: 4 }}>
                      <Button size='lg' variant="dark" onClick={()=>resetSearch()}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='my-4'>
        <Container>
                <Row>
                    {
                        isLoading ?
                        <SpinnerComponent/>:
                        isError ?
                        <h3 className='text-center text-danger'>{message}</h3> :
                        <>
                          {searchCategory(foodCategoryList).length === 0 ? 
                          <h3 className="text-center text-primary"> "Product Not Found"</h3>:
                          
                          searchCategory(foodCategoryList).map((foodItem)=>{
                            return (
                                <Col md="4" key={foodItem.idCategory}>
                                    <Card className='my-3' style={{boxShadow: "0px 1px 10px 1px #dfdfdf"}}>
                                        <Card.Img variant="top" src={foodItem.strCategoryThumb} className='card_img3' />
                                        <Card.Body>
                                            <Card.Title className='card_title'>{foodItem.strCategory}</Card.Title>
                                            <Card.Text className='text-ellipsis'>
                                            {foodItem.strCategoryDescription}
                                            </Card.Text>
                                            <Button variant="primary" onClick={()=>singleCategory(foodItem)}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }) 
                          
                          }
                    
                        </>  
                    }
                </Row>
            </Container>
        </div>
         <ViewCategoryModal viewSingleModal={viewSingleModal} setViewSingleModal={setViewSingleModal} viewSingleCategory={viewSingleCategory} />           
    </>
)
}

export default FoodProductCategory