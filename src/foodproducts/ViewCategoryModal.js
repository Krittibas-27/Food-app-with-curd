import React from 'react'
import { Modal, Stack,Image } from 'react-bootstrap'

const ViewCategoryModal = ({viewSingleModal,setViewSingleModal,viewSingleCategory}) => {
  return (
    <Modal centered size='lg' show={viewSingleModal} onHide={()=>setViewSingleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{viewSingleCategory.strCategory && viewSingleCategory.strCategory} details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2"><Image src={viewSingleCategory.strCategoryThumb}/></div>
            <div className="p-2 ms-auto">
              <p><strong>Catogory Name</strong> : {viewSingleCategory.strCategory && viewSingleCategory.strCategory}</p>
              <p><strong>Details</strong> : <br/>
              {viewSingleCategory.strCategoryDescription && viewSingleCategory.strCategoryDescription}</p>
            </div>
          </Stack>
          </Modal.Body>
        </Modal>
  )
}

export default ViewCategoryModal