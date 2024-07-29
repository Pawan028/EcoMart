import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Import the CSS file
import logo from '../asets/L8.png';

const CustomNavbar = ({ isLoggedIn, username, setIsLoggedIn }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/login');
    console.log('User logged out');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/" onClick={handleSidebarToggle}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Company logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/"><i className="fas fa-home"></i> Home</Nav.Link>
            <Nav.Link as={Link} to="/about"><i className="fas fa-info-circle"></i> About</Nav.Link>
            <Nav.Link as={Link} to="/contact"><i className="fas fa-envelope"></i> Contact Us</Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> My Cart
              </Nav.Link>
            )}
          </Nav>
          {isLoggedIn ? (
            <>
              <Form inline className="ml-auto">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  style={{ display: 'inline-block', width: 'auto' }}
                />
                <Button variant="outline-success" style={{ display: 'inline-block', width: 'auto' }}>
                  <i className="fas fa-search"></i>
                </Button>
              </Form>

              <NavDropdown title={<><i className="fas fa-user"></i> Hi, {username}</>} id="basic-nav-dropdown" className="ml-3">
                <NavDropdown.Item as={Link} to="/profile"><i className="fas fa-user-circle"></i> Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
              <Nav.Link as={Link} to="/register"><i className="fas fa-user-plus"></i> Signup</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>

      {isLoggedIn && (
        <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
          <div className="sidebar-header">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Company logo"
            />
            <button className="close-btn" onClick={handleSidebarToggle}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <hr />
          <hr />
          <h4><i className="fas fa-user"></i> {`Hi, ${username}`}</h4>
          <hr />
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/profile"><i className="fas fa-user-circle"></i> Profile</Nav.Link>
            <hr />
            <Nav.Link onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
          </Nav>
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;
