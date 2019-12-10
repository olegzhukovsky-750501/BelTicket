import React, { Component } from 'react'

import { Col, Button, Form, Card, Row } from 'react-bootstrap'
import { updateAccount } from '../Services'
import { toast } from 'react-toastify'
import { getHash } from './commons/Functions'

class AccountSettings extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            fname: '',
            lname: '',
            email: '',
        }
        this.baseState = this.state
    }

    componentDidMount() {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            this.setState({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
            })
        }
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        }
    }

    handleChange = type => event => {
        let value = event
        if (event.target) {
            value = event.target.value
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        const form = event.currentTarget
        const id = JSON.parse(localStorage.getItem('user'))._id
        if (form.checkValidity() === true) {
            var body = { ...this.state }
            if (this.state.password) {
                body = { ...body, password: getHash(this.state.password) }
            }
            updateAccount(body, id)
                .then(res => {
                    toast.success("Данные аккаунта обновлены")
                    localStorage.setItem('user', JSON.stringify(res))
                })
                .catch(err => {
                    toast.error("Не могу обновить данные")
                })
        }
        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Row style={{ width: '60%', marginBottom: 100, marginTop: 50}}>
                    <Col>
                        <Card style={{ padding: 20 }}>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridFName">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control required type="username" placeholder="Enter first name" onChange={this.handleChange('fname')} value={this.state.fname} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLName">
                                        <Form.Label>Фамилия</Form.Label>
                                        <Form.Control required type="username" placeholder="Enter last name" onChange={this.handleChange('lname')} value={this.state.lname} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Введите email" onChange={this.handleChange('email')} value={this.state.email} disabled />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Введите новый пароль" onChange={this.handleChange('password')} />
                                </Form.Group>
                                <Col style={{ paddingRight: 0 }} align='right'>
                                    <Button variant="primary" type="submit">
                                        Обновить данные
                                    </Button>
                                </Col>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default AccountSettings
