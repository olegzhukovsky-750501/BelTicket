import React, { Component } from 'react'

import { Navbar, Nav, NavDropdown, Image, Row, Card, Col, Button} from 'react-bootstrap'

class Footer extends Component {

    render() {
      var user = localStorage.getItem('user')
        return (
          <footer className="page-footer font-small" style={{ backgroundColor: '#2b78e4', color: 'white', position: 'absolute', bottom: 0, width: '100%' }}>
            <div class="container">
            <Row>
              <Col lg = "4">
                <h1 class = "h5">Контакты</h1>
                <div class = "h6">Контактный номер : (+375)29 588 32 90</div>
              </Col>
              <Col lg = "8">
                <h1 class = "h5">Месторасположение</h1>
                <div class = "h6">Республика Беларусь,<br/>г. Минск, ул. Гикало 9</div>
                <div className="footer-copyright text-left py-3 mb-1">Copyright © BelTicket 2019 Все права защищены</div>
              </Col>
            </Row>
          </div>
            </footer>
        )
    }
}

export default Footer
