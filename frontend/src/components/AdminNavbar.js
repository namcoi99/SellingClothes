import React, { Component } from 'react';
import '../Css/header.css';
import axios from '../axios';

class AdminNavbar extends Component {

    state = {
        products: [],
        orders: [],
        // productSearch: '',
    }

    // handleChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    //     if (event.target.name === 'productSearch') {
    //         if (event.target.value !== '') {
    //             axios.get(`http://localhost:5005/list?pageNumber=1&pageSize=4&keyword=${event.target.value}`)
    //                 .then(data => {
    //                     this.setState({
    //                         products: data.data.data.recordset
    //                     })
    //                 })
    //                 .catch(err => console.log(err))
    //         } else {
    //             this.setState({ products: [] })
    //         }
    //     } else if (event.target.name === 'orderSearch') {

    //     }
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.orderSearch !== '') {
            window.location.href = `/order-detail/${this.state.orderSearch}`
        }
    }

    SignOut = () => {
        localStorage.removeItem("username")
        localStorage.removeItem('cart')
        this.props.username = null
        window.location.href = '/'
    }

    // viewOrder = (event) => {
    //     event.preventDefault();
    //     const username = localStorage.getItem('username');
    //     if (username) {
    //         window.location.href = '/order-list';
    //     }
    //     else {
    //         alert('You must log in first');
    //     }
    // }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/admin"><i className="fas fa-frog" style={{ fontSize: "2rem" }}></i> <b style={{ fontSize: "1.5rem" }}>STREETWEAR</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Sản phẩm<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="admin/order-list" >Đơn hàng</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-2">
                        <li className="nav-item">
                            <a className="nav-link" href='/'>Trang người dùng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='/' onClick={this.SignOut}>Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default AdminNavbar;