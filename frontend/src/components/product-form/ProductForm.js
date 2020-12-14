import React, { Component } from 'react'
import axios from '../../axios.js'
import '../../Css/addform.css'

export default class ProductFrom extends Component {

    state = {
        Name: this.props.item.Name,
        Category: this.props.item.Category ? this.props.item.Category : 'Bag',
        Info: this.props.item.Info,
        Price: this.props.item.Price,
        Sold: this.props.item.Sold
    };

    handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleAddSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        axios
            .post(`/product`, {
                productID: 'TA19',
                name: this.state.Name,
                category: this.state.Category,
                info: this.state.Info,
                image: 'https://i.pinimg.com/originals/88/6c/39/886c39ea59d88d3b6c859592eeff02be.jpg',
                price: this.state.Price,
                sold: this.state.Sold
            })
            .then((data) => {
                if (data.data.success) {
                    console.log(data.data)
                } else {
                    alert(data.data.message)
                }
                window.location.reload()
            })
            .catch(err => console.log(err))

    }

    handleEditSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        axios
            .put(`/product/${this.props.item.ProductID}`, {
                name: this.state.Name,
                category: this.state.Category,
                info: this.state.Info,
                price: this.state.Price,
                sold: this.state.Sold
            })
            .then((data) => {
                if (data.data.success) {
                    console.log(data.data)
                } else {
                    alert(data.data.message)
                }
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form id="contact-form" role="form" onSubmit={this.props.action == "add" ? this.handleAddSubmit : this.handleEditSubmit}>
                        <div className="controls">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="form_name">Tên sản phẩm<span className="required"> *</span></label>
                                        <input id="form_name" name="Name" value={this.state.Name} type="text" className="form-control" required="required" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="form_price">Giá bán (VND) <span className="required"> *</span></label>
                                        <input id="form_price" name="Price" value={this.state.Price} type="number" className="form-control" required="required" onChange={this.handleChange} />
                                    </div>
                                </div>
                                {window.localStorage.getItem('username') == 'admin' ?
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="form_sold">Số lượng đã bán <span className="required"> *</span></label>
                                            <input id="form_sold" name="Sold" value={this.state.Sold} type="number" className="form-control" required="required" onChange={this.handleChange} />
                                        </div>
                                    </div> : ''
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="item-category" className="col-sm-4 col-form-label">Danh mục <span className="required"> *</span></label>
                                        <select className="form-control" id="item-category" name="Category" onChange={this.handleChange}>
                                            <option value='Bag'>Bag</option>
                                            <option value='Pants'>Pants</option>
                                            <option value='Shirt'>Shirt</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="form_message">Mô tả</label>
                                        <textarea id="form_message" name="Info" value={this.state.Info} className="form-control" rows={3} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="upload-area">
                                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                                <input type="file" id="customFile" />
                                {/* <img src=""/> */}
                            </div>
                            <div className="alert alert-success" role="alert">
                                This is a success alert—check it out!
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-success add-button">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
