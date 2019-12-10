import React, { Component } from 'react'

import { Table, Row, Form, Col, Button } from 'react-bootstrap'
import { validateCard, buyTicket} from '../Services'
import { toast } from 'react-toastify'

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: 'card',
            errMsg: 'Заполните все поля',
            showPaymentErr: false,
            validateErrMsg: 'Введённые данные не валидны',
            showValidateErr: false,
            cardNo: '',
            cvc: '',
            exp: '',
        };
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({ ...this.props.location.state })
        }
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        }
    }

    handleChange = type => event => {
        var value = event.target.value
        if (type === 'card') {
            this.setState({ checked: type })
        } else {
            this.setState({ [type]: value })
        }
    }

    handleSubmit = async  event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({ showPaymentErr: false, showValidateErr: false })
        const state = this.state;
        if (state.cardNo && state.cvc && state.exp) {
            validateCard({ card: state.cardNo, cvc: state.cvc, exp: state.exp, total: state.total })
                .then(res => {
                    if (res.validated) {
                        this.createOrder({ card: state.cardNo })
                    } else {
                        this.setState({ showValidateErr: true })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            this.setState({ showPaymentErr: true })
        }
    }

    createOrder = () => {
        const state = this.state
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            const ticket = {
                user: user._id,
                email: user.email,
                from: state.from.value,
                to: state.to.value,
                time: state.time.value,
                qty: state.qty,
                date: state.date,
                total: state.total
            }
            buyTicket(ticket)
                .then(res => {
                    toast.success("Успешно оплачено " + ticket.total)
                    this.props.history.push('/tickets')
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <Form style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 120}} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%' }}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td align='right'>Всего</td>
                                    <td align='right'>{this.state.total} BYN</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                    </Form.Row>
                        <Form.Row style={{ width: '75%' }}>
                            <Form.Group as={Col} controlId="cardNo">
                                <Form.Label>Номер карты</Form.Label>
                                <Form.Control onChange={this.handleChange('cardNo')} value={this.state.cardNo} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="cvc">
                                <Form.Label>CVC Number</Form.Label>
                                <Form.Control onChange={this.handleChange('cvc')} value={this.state.cvc} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exp">
                                <Form.Label>Дата истечения</Form.Label>
                                <Form.Control placeholder="DD/MM" onChange={this.handleChange('exp')} value={this.state.exp} />
                            </Form.Group>
                        </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        {this.state.showPaymentErr && <p style={{ color: 'red' }}>{this.state.errMsg}</p>}
                        {this.state.showValidateErr && <p style={{ color: 'red' }}>{this.state.validateErrMsg}</p>}
                    </Form.Row>
                    <Form.Row style={{ width: '75%' }}>
                        <Button variant="primary" type="submit">
                            Оплатить
                        </Button>
                    </Form.Row>
                </Row>
            </Form>
        )
    }
}

export default Payment
