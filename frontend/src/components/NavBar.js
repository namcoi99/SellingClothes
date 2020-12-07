import React, { Component } from 'react';
import '../Css/header.css';
import logo from '../Images/logo.png'
import pizza from '../pizaa-1.jpg';
import burger from '../hamburger-nav.png';
import milktea from '../milktea-nav.jpg';
import axios from '../axios';

class NavBar extends Component {

    state = {
        products: [],
        orders: [],
        productSearch: '',
        orderSearch: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name === 'productSearch') {
            if (event.target.value !== '') {
                axios.get(`/product/list?pageNumber=1&pageSize=4&keyword=${event.target.value}`)
                    .then(data => {
                        this.setState({
                            products: data.data.data.recordset
                        })
                    })
                    .catch(err => console.log(err))
            } else {
                this.setState({ products: [] })
            }
        } else if (event.target.name === 'orderSearch') {

        }
    }

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

    componentDidMount() {
        axios.get(`/product/best-seller`)
            .then(data => {
                this.setState({
                    products: data.data.data.recordset
                })
            })
            .catch(err => console.log(err));
    }

    viewCart = (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (username) {
            window.location.href = '/cart';
        }
        else {
            alert('You must log in first');
        }
    }

    viewOrder = (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (username) {
            window.location.href = '/order-list';
        }
        else {
            alert('You must log in first');
        }
    }

    render() {
        const prefix = this.state.products ? this.state.products.map(item => (
            <a className='search-1' key={item.ProductID} href={`/product/${item.ProductID}`}>
                <div className='result-item' key={item.ProductID}>
                    {item.Name.toString().toLowerCase()}
                </div>
            </a>
        )) : ''
        const displayItems = this.props.products ? this.props.products.map(item => (
            <div className="list-item-left">
                <a key={item.ProductID} href={`/product/${item.ProductID}`}>
                    <div key={item.ProductID} className="list-item-right">
                        <i className="fas fa-times" area-hidden="true"></i>
                        <img src={`http://localhost:5000/image/products/${item.Image}.png`} alt={item.Name} />
                        <div className="content-item-order">
                            <h3>{item.Name}</h3>
                            <p>{item.Price}đ*{item.Quantity}</p>
                        </div>
                    </div>
                </a>
            </div>
        )) : ''

        var username = localStorage.getItem('username')
        let SignIn
        let SignUp
        let LogOut
        if (username == null)
            SignIn = (
                <a className="nav-link" href="/signin">Đăng nhập</a>
            )
        else
            SignIn = (
                <div className="nav-link text-white">Chào mừng, {username} </div>
            )
        if (username == null)
            SignUp = (
                <a className="nav-link" href="/signup">Đăng ký</a>
            )
        if (username != null)
            LogOut = (
                <a className="nav-link" href='/' onClick={this.SignOut}>Đăng xuất</a>
            )
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"><i class="fas fa-frog" style={{ fontSize: "2rem" }}></i> <b style={{ fontSize: "1.5rem" }}>STREETWEAR</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Trang chủ <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sản phẩm
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href='/menuPizza'>Áo</a>
                                <a className="dropdown-item" href='/menuBurger'>Quần</a>
                                <a className="dropdown-item" href='/menuMilktea'>Phụ kiện</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.viewCart}>Giỏ hàng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.viewOrder}>Đơn hàng</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" style={{position: "relative"}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm sản phẩm..."
                         name="productSearch" id="productSearch" onChange={this.handleChange} />
                        <div className='search-container-1'>{prefix}</div>
                        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit" onClick={(e) => this.handleSubmit(e)}>Tìm kiếm</button>
                        
                    </form>
                    <ul className="navbar-nav ml-2">
                        <li className="nav-item">
                            {SignUp}
                        </li>
                        <li className="nav-item">
                            {SignIn}
                        </li>
                        <li className="nav-item">
                            {LogOut}
                        </li>
                    </ul>
                    <div>



                    </div>
                </div>
            </nav>
            // <div className='header-container'>
            //     <div className="header">
            //         <div className="top-header">
            //             <div className="support">
            //                 <i className="fas fa-headset"></i>
            //                 <span className="title-support">Điện thoại hỗ trợ</span>
            //                 <span className="phone-support">19001009</span>
            //                 <span className="support">|</span>
            //                 <span>
            //                     Follow us
            //                     <a href="https://www.facebook.com/tatuan19" target="__blank"><i className="fab fa-facebook"></i></a>
            //                     <a href="https://www.instagram.com/locckhl/?hl=vi" target="__blank"><i className="fab fa-instagram"></i></a>
            //                     <a href="https://www.youtube.com/channel/UCiF_9u_6OLFuQ5UZe8il94w?view_as=subscriber"><i className="fab fa-youtube"></i></a>
            //                 </span>
            //             </div>
            //             <div className="user">
            //                 {SignUp}
            //                 {SignIn}
            //                 {LogOut}
            //             </div>
            //         </div>
            //         {/* bottom-header */}
            //         <div className="bottom-header">
            //             <div className="logo">
            //                 <a href="/" className="text-white" style={{
            //                     fontSize: "1.5rem",
            //                     fontWeight: "bold"

            //                 }}> STREETWEAR
            //                 </a>

            //             </div>
            //             <div className="nav">
            //                 <ul className="nav-ul">
            //                     <li><a href="/"><b>TRANG CHỦ</b></a></li>
            //                     {/* <li><a href='/'>
            //                         <b>MENU</b>
            //                         <i className="fas fa-sort-down"></i>

            //                         <div id="sub-nav">
            //                             <div className="sub-nav-item-container">
            //                                 <div className="sub-nav-item">

            //                                 </div>
            //                                 <div className="sub-nav-item">

            //                                 </div>
            //                                 <div className="sub-nav-item">
            //                                     <a href='/menuMilktea'>Phụ kiện</a>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </a></li> */}
            //                     <li><a href='/menuPizza'><b>Áo</b></a></li>
            //                     <li><a href='/menuBurger'>Quần</a></li>
            //                     <li><a href="#" onClick={this.viewOrder}><b>ĐƠN HÀNG</b></a></li>
            //                 </ul>
            //             </div>

            //             <form autoComplete='Off' className="input-form">
            //                 <input type="text" name="productSearch" id="productSearch" onChange={this.handleChange} placeholder="Tìm kiếm sản phẩm" />
            //                 <div className='search-container-1'>
            //                     {prefix}
            //                 </div>
            //                 <a>
            //                     <button className="i-2" onClick={(e) => this.handleSubmit(e)}>
            //                         <i className="fas fa-search search-icon"></i>
            //                     </button>
            //                 </a>
            //                 <input type="text" name="orderSearch" id="orderSearch" onChange={this.handleChange} placeholder="Tìm kiếm đơn hàng" />
            //                 <a href='/order-detail'>
            //                     <button className="i-1" onClick={(e) => this.handleSubmit(e)}>
            //                         <i className="fas fa-search search-icon"></i>
            //                     </button>
            //                 </a>
            //             </form>
            //             {/* <div className="hot-words">
            //                 <div className="hot-words-list">
            //                     <a href="/product">Pizaa</a>
            //                     <a href="/product">Chicken</a>
            //                     <a href="/product">Hamburger</a>
            //                     <a href="/product">Milk tea</a>
            //                     <a href="/product">Pizaa</a>
            //                     <a href="/product">Chicken</a>
            //                     <a href="/product">Hamburger</a>
            //                     <a href="/product">Milk tea</a>
            //                 </div>
            //             </div> */}
            //             <div className="cart">
            //                 <div className="ic-cart" >
            //                     <a href="#" onClick={this.viewCart}>
            //                         <i className="fas fa-cart-plus"></i>
            //                         <span className="number-cart">{this.props.count}</span>
            //                     </a>
            //                 </div>
            //                 <div className="text-cart">
            //                     <h5 className="txt-small">Giỏ hàng</h5>
            //                     <h4 className="txt-medium">
            //                         {this.props.Total}đ
            //                             <i className="fas fa-sort-down"></i>
            //                     </h4>
            //                 </div>
            //                 <div className="list-cart">
            //                     {displayItems}
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default NavBar;