import React, { Component } from 'react';

import { Row, Col, Button, Card, Pagination } from 'react-bootstrap'
import { getTickets} from '../Services'
import { toast } from 'react-toastify'

class Tickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            items: [],
            offset: 1,
            lastPage: 1,
            paginateItems: []
        };
    }

    componentDidMount() {
        this.updateTickets()
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        }
    }

    updateTickets = () => {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        } else {
            user = JSON.parse(user)
            getTickets(user._id)
                .then(res => {
                    this.setState({ tickets: res }, () => this.paginateTickets())
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    paginateTickets = () => {
        let items = [];
        const offset = (this.state.offset - 1) * 5

        for (let number = offset; number < offset + 5; number++) {
            const ticket = this.state.tickets[number]
            if (ticket) {
                items.push(
                    <Row style={{ width: '75%' }} key={number}>
                        <Col>
                            <Card style={{ padding: 10, marginTop: 10 }}>
                                <Row>
                                    <Col>Номер записи : {ticket._id}</Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>Откуда <b>{ticket.from}</b> to <b>{ticket.to}</b></Col>
                                    <Col align='right'>{ticket.date} {ticket.time}</Col>
                                </Row>
                                <Row>
                                    <Col>Количество : {ticket.qty}</Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col align='right'><b>Всего :</b> {ticket.total.toFixed(2)}</Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        }
        let paginateItems = [];
        const lastPage = Math.ceil(this.state.tickets.length / 5)
        for (let number = 1; number <= lastPage; number++) {
            paginateItems.push(
                <Pagination.Item key={number} active={number === this.state.offset} onClick={() => this.pageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        this.setState({ paginateItems: paginateItems, items: items, lastPage: lastPage })
    }

    pageChange = n => {
        console.log(n)
        this.setState({ offset: n }, () => this.paginateTickets())
    }

    render() {
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {this.state.tickets.length <= 0 &&
                    <Row style={{ width: '75%', padding: 10 }}>
                        <Col>
                            <Card>
                                <Card.Body>У вас ещё нет купленных билетов</Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                {this.state.tickets.length > 0 &&
                    <>
                        <Row style={{ width: '75%', paddingTop: 20, paddingLeft: 15 }}>
                            <Pagination>
                                <Pagination.First onClick={() => this.pageChange(1)} />
                                {this.state.paginateItems}
                                <Pagination.Last onClick={() => this.pageChange(this.state.lastPage)} />
                            </Pagination>
                        </Row>
                        {this.state.items.map((ticket, i) => {
                            return (
                                ticket
                            )
                        })}
                        <Row style={{ width: '75%', paddingTop: 20, paddingLeft: 15 }}>
                            <Pagination>
                                <Pagination.First onClick={() => this.pageChange(1)} />
                                {this.state.paginateItems}
                                <Pagination.Last onClick={() => this.pageChange(this.state.lastPage)} />
                            </Pagination>
                        </Row>
                    </>
                }
            </Row>
        );
    }
}

export default Tickets;
