import React, { Component } from 'react'
import '../Css/table.css'
import axios from '../axios.js'
import AddProductModal from './product-form/AddProductModal'
import DelConfirmModal from './DelConfirmModal'
import EditProductModal from './product-form/EditProductModal'

class ProductTable extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        axios
            .get(`/v1/shops/1/items`)
            .then(data => {
                this.setState({
                    items: data.data
                })
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }

    handleDelete = (itemID) => {
        // console.log(this.props.storeID);
        axios
        .delete(`/v1/shops/1/${itemID}`)
        .then(data => {
            console.log(data.data);
            alert("Xóa sản phẩm thành công");  
            window.location.reload();
        })
        .catch(err => alert(err.message))
    }

    render() {
        const all_items = this.state.items.map(item =>
            <tr>
                <th scope="row">{item.id}</th>
                <td className="w-25">
                    <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" className="img-fluid img-thumbnail" alt="Sheep" />
                </td>
                <td>{item.item_name}</td>
                <td>{item.price}$</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                    <div className="widget-26-job-starred">
                        <button type="button" className="btn btn-outline-danger btn-sm mr-2"
                            // value={store.id} onClick={this.handleStoreChange}
                            data-toggle="modal" data-target={`#EditItemModal${item.id}`}>
                            <i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target={`#delModal${item.id}`}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
                {/* Edit Modal */}
                <EditProductModal item={item} />
                {/*  Delete Modal*/}
                <DelConfirmModal item={item} deleteMethod={this.handleDelete} objectID={item.id} />
            </tr>)
        return (
            <div className="container" style={{ height: "100vh" }}>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-employee card-margin">
                            <div className="card-body">
                                <div className="row search-body">
                                    <div className="col-lg-12">
                                        <div className="search-result">
                                            <div className="result-body">
                                                <div className="table-responsive">
                                                    <table className="table widget-26">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Ảnh</th>
                                                                <th scope="col">Tên sản phẩm</th>
                                                                <th scope="col">Giá</th>
                                                                <th scope="col">Mô tả</th>
                                                                <th scope="col">Số lượng</th>
                                                                <th scope="col">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {all_items}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <nav className="d-flex justify-content-center">
                                    <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                                        <li className="page-item">
                                            <a className="page-link no-border" href="#">
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li className="page-item active"><a className="page-link no-border" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link no-border" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link no-border" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link no-border" href="#">4</a></li>
                                        <li className="page-item">
                                            <a className="page-link no-border" href="#">
                                                <span aria-hidden="true">»</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Add Modal*/}
                <AddProductModal />
            </div>
        );
    }
}

export default ProductTable;