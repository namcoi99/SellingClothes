import React, { Component } from 'react'
import '../Css/table.css'
import axios from '../axios.js'
import DelConfirmModal from './DelConfirmModal'
import EditProductModal from './product-form/EditProductModal'

class ProductTable extends Component {

    handleDelete = (itemID) => {
        axios
            .delete(`/order/${itemID}`)
            .then(data => {
                console.log(data.data);
                if (data.data.success) {
                    alert("Xóa đơn hàng thành công");
                    window.location.reload();
                } else {
                    window.alert(data.data.message);
                }
            })
            .catch(err => alert(err.message))
    }

    render() {
        const all_items = this.props.productList.map(item =>
            <tr>
                <td style={{width: "15%"}}>{item.OrderID}</td>
                <td style={{width: "20%"}}>{item.CreateDate.substr(0,10)}</td>
                <td style={{width: "20%"}}>{item.Username}</td>
                <td style={{width: "20%"}}>{item.Total}</td>
                <td style={{width: "25%"}}>{item.Status}</td>
                <td>
                    <div className="widget-26-job-starred">
                        {/* <button type="button" className="btn btn-outline-secondary btn-sm mr-2"
                            // value={store.id} onClick={this.handleStoreChange}
                            data-toggle="modal" data-target={`#EditItemModal${item.ProductID}`}>
                            <i className="fas fa-edit"></i></button> */}
                        <button type="button" className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target={`#delModal${item.OrderID}`}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
                {/* Edit Modal */}
                {/* <EditProductModal item={item} /> */}
                {/*  Delete Modal*/}
                <DelConfirmModal deleteMethod={this.handleDelete} objectID={item.OrderID} />
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
                                                                <th scope="col">Mã đơn hàng</th>
                                                                <th scope="col">Ngày đặt hàng</th>
                                                                <th scope="col">Khách hàng</th>
                                                                <th scope="col">Tổng giá trị</th>
                                                                <th scope="col">Trạng thái</th>
                                                                <th></th>
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
            </div>
        );
    }
}

export default ProductTable;