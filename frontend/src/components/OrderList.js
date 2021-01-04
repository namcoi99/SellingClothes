import React, { Component } from 'react';
import '../Css/order-list.css';
import axios from '../axios'
import Navbar from './NavBar';

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderDetails: [],
            total: 0
        }
        this.getData()
    }

    getData = () => {
        const username = localStorage.getItem('username');
        axios
            .get(`http://localhost:5003?username=${username}`)
            .then(data => {
                console.log(data.data.data.recordset);
                if (data.data.success) {
                    this.setState({
                        orderDetails: data.data.data.recordset,
                        total: data.data.data.total
                    });
                    console.log(this.state)
                } else {
                    alert(data.data.message)
                }
            })
            .catch(err => alert(err.message))
    }

    render() {

        const OrderList = this.state.orderDetails.map(item => (
            <div key={item.OrderID} className="orderlist-item" >
                <a className="order-id" href={`/order-detail/${item.OrderID}`}>{item.OrderID}</a>
                <div className="order-date">{item.CreateDate.substr(0, 10)}</div>
                <div className="order-name">{item.Username}</div>
                <div className="order-total">{item.Total}</div>
                <div className="order-status">{item.Status}</div>
            </div>
        ));

        return (
            <div>
                <Navbar products={this.props.state.products} handleSearch={this.props.handleSearch} Total={this.props.state.Total} count={this.props.state.count} />
                <div className="orderlist">
                    {/* <div className="orderlist-top">
                        <a href="/home">Trang chủ</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/order-list">Đơn hàng</a>
                    </div> */}
                    <div className="orderlist-bottom">
                        <div className="order-list-header">
                            Đơn hàng đã đặt
                        </div>
                        <div className="order-list-orderlist">
                            <div className="orderlist-header">
                                <div className="order-id">Mã đơn hàng</div>
                                <div className="order-date">Ngày đặt hàng</div>
                                <div className="order-name">Khách hàng</div>
                                <div className="order-total">Tổng giá trị</div>
                                <div className="order-status">Trạng thái</div>
                            </div>
                            <div>{OrderList}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;