import React, { Component } from 'react'

import { Navbar, Nav, NavDropdown, Image, Row } from 'react-bootstrap'

class NavBar extends Component {

    render() {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <>
            <Navbar bg="light" expand="md">
              <Navbar.Brand href="/">
                <img
                  alt="BelTicket"
                  src= {require("../../images/bus_logo.svg")}
                  width="64"
                  height="64"
                  className="d-inline-block align-top"
                />{' '}
            <h1 style={{textAlign: "center", fontSize: 18, fontFamily: "Brush Script MT, Brush Script Std, cursive"}}>BelTicket</h1>
            </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {user ?
                                <>
                                    <Nav.Link href="/tickets" >Ваши билеты</Nav.Link>
                                    <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                        <NavDropdown.Item href="/account">Данные пассажира</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/tickets">Ваши билеты</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.props.logout}>Выход</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                    <Nav.Link href="" onClick={this.props.handleLoginShow}>Войти</Nav.Link>
                                    <Nav.Link href="" onClick={this.props.handleRegisterShow}>Зарегистрироваться</Nav.Link>
                                </>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Row>
                    <div class = "col">
                        <Image width = "100%" src={require("../../images/bus.jpg")}/>
                    </div>
                </Row>
            </>
        );
    }
}

export default NavBar;
