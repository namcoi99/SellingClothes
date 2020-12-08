import React, { Component } from 'react'
import '../Css/table.css'
import axios from '../axios.js'
import AddProductModal from './product-form/AddProductModal'
import DelConfirmModal from './DelConfirmModal'
import EditProductModal from './product-form/EditProductModal'

class ProductTable extends Component {

    handleDelete = (itemID) => {
        axios
            .delete(`/product/${itemID}`)
            .then(data => {
                console.log(data.data);
                if (data.data.success) {
                    alert("Xóa sản phẩm thành công");
                    window.location.reload();
                } else {
                    window.alert(data.data.message)
                }
            })
            .catch(err => alert(err.message))
    }

    render() {
        const all_items = this.props.productList.map(item =>
            <tr>
                <th scope="row">{item.ProductID}</th>
                <td className="w-25">
                    <img src={`http://localhost:5000/image/products/${item.Image}.jpg`} className="img-fluid img-thumbnail" alt="Product Image"
                        style={{
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeate',
                            height: '100px',
                            width: '100px'
                        }} />
                </td>
                <td>{item.Name}</td>
                <td>{item.Category}</td>
                <td>{item.Price}</td>
                <td>{item.Info}</td>
                <td>{item.Sold}</td>
                <td>
                    <div className="widget-26-job-starred">
                        <button type="button" className="btn btn-outline-danger btn-sm mr-2"
                            // value={store.id} onClick={this.handleStoreChange}
                            data-toggle="modal" data-target={`#EditItemModal${item.ProductID}`}>
                            <i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target={`#delModal${item.ProductID}`}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
                {/* Edit Modal */}
                <EditProductModal item={item} />
                {/*  Delete Modal*/}
                <DelConfirmModal deleteMethod={this.handleDelete} objectID={item.ProductID} />
            </tr>)
        return (
            <div className="container">
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
                                                                <th scope="col">Danh mục</th>
                                                                <th scope="col">Giá</th>
                                                                <th scope="col">Mô tả</th>
                                                                <th scope="col">Số lượng đã bán</th>
                                                                <th scope="col"></th>
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