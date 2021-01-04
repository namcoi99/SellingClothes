import React, { Component } from 'react'
import axios from '../../axios.js'
import '../../Css/addform.css'

const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/;

export default class ProductFrom extends Component {

    state = {
        Name: this.props.item.Name,
<<<<<<< HEAD
        Category: this.props.item.Category ? this.props.item.Category : 'Shirt',
=======
        Category: this.props.item.Category ? this.props.item.Category : 'Bag',
>>>>>>> 0e20da66401bca8a55f6ddc03e9765b80b961571
        Info: this.props.item.Info,
        Price: this.props.item.Price,
        Sold: this.props.item.Sold,

        //file
        file: undefined,
        fileName: "",
        imageUrl: "",
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
<<<<<<< HEAD
        // const formData = new FormData();
        // formData.append("image", this.state.file);
        // const uploadResult = await fetch("http://localhost:5000/product/uploads/photos", {
        //     method: "POST",
        //     // credentials: 'include',
        //     body: formData
        // }).then((res) => { return res.json(); });
        // console.log(uploadResult);
=======
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
>>>>>>> 0e20da66401bca8a55f6ddc03e9765b80b961571

        // create new product
        axios
            .post(`/product`, {
                name: this.state.Name,
                price: this.state.Price,
                info: this.state.Info,
                // filename: uploadResult.data,
                category: this.state.Category,
                sold: this.state.Sold
            })
            .then(() => {
                window.location.href = '/admin'
            })
            .catch(err => alert(err.message))
    }


    handleFileChange = (event) => {
        const file = event.target.files[0];

        //validate file
        if (!imageFileRegex.test(file.name)) {
            this.setState({
                errMessage: 'Invalid image file',
            });
        } else if (file.size > maxFileSize) {
            this.setState({
                errMessage: 'File too large (Less than 5MB)',
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file); //ham bat dong bo
            //convert file to base64string
            fileReader.onloadend = () => {
                // console.log(fileReader.result)
                this.setState({
                    file: file,
                    fileName: file.name,
                    imageUrl: fileReader.result,
                    errMessage: ""
                });
            }
        }
    }

    handleEditSubmit = (event) => {
        event.preventDefault();
<<<<<<< HEAD
        axios
            .put(`/product/${this.props.item.ProductID}`, {
                name: this.state.Name,
                price: this.state.Price,
                info: this.state.Info,
                // filename: uploadResult.data,
                category: this.state.Category,
                sold: this.state.Sold
            })
            .then(() => {
                window.location.href = '/admin'
            })
            .catch(err => alert(err.message))
=======
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
>>>>>>> 0e20da66401bca8a55f6ddc03e9765b80b961571
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
<<<<<<< HEAD
                                        <label htmlFor="item-category">Danh mục</label>
                                        <select className="form-control" id="item-category" name="Category" onChange={this.handleChange}>
                                            <option value='Shirt'>Áo</option>
                                            <option value='Pants'>Quần</option>
                                            <option value='Bag'>Phụ kiện</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
=======
>>>>>>> 0e20da66401bca8a55f6ddc03e9765b80b961571
                                        <label htmlFor="form_price">Giá bán (VND) <span className="required"> *</span></label>
                                        <input id="form_price" name="Price" value={this.state.Price} type="number" className="form-control" required="required" onChange={this.handleChange} />
                                    </div>
                                </div>
<<<<<<< HEAD
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="form_sold">Số lượng đã bán<span className="required"> *</span></label>
                                        <input id="form_sole" name="Sold" value={this.state.Sold} type="number" className="form-control" required="required" onChange={this.handleChange} />
=======
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
>>>>>>> 0e20da66401bca8a55f6ddc03e9765b80b961571
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
                                <input type="file" id="customFile" onChange={this.handleFileChange} />
                                {this.state.imageUrl ? (
                                    <div style={{
                                        backgroundImage: `url(${this.state.imageUrl})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '200px',
                                        marginTop: '1rem',
                                    }}></div>
                                ) : null}
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
