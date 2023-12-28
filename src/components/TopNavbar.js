import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate()
  const storageData = JSON.parse(localStorage.getItem("userLogin"));
  const logoutUser=()=>{
    localStorage.removeItem("userLogin")
    navigate('/login')
    window.location.reload()
  }
  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">FoodApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="/">Food Category</Nav.Link>
            <Nav.Link href="/userloginlist">User Login List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button className="cart_icon cursor-pointer">
          <FiShoppingCart className="text-white" size={30} />
          <Badge pill bg="light" text="dark" className="budge_menubar">
            0
          </Badge>
        </Button>

        {
          storageData.username && 
          <Dropdown>
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            <Avatar
              size="35"
              round={true}
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              name={storageData.username}
              textSizeRatio={1.8}
              className="cursor-pointer"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/user/profile">User Details</Dropdown.Item>
            <Link className="dropdown-item" onClick={()=>logoutUser()}>Logout </Link>
          </Dropdown.Menu>
        </Dropdown>
        }
        
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
