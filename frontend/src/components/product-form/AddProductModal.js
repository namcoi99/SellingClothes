import React, { Component } from 'react'
import ProductForm from './ProductForm'

// import '../assets/css/addmodal.css'

export default class AddProductModal extends Component {
    state = {
        item: { id: 0, item_name: '', price: 0, description: '', quantity: 0 }
    }
    render() {
        return (
            <div>
                {/* Button trigger modal */}
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">
                    Thêm sản phẩm
                </button> */}
                {/* Modal */}
                <div className="modal fade add-modal" id="addModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document" style={{ maxWidth: "40vw" }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: "#47c9a2", color: "white" }}>
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    <i className="fas fa-plus-circle"></i> Thêm sản phẩm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ProductForm item={this.state.item} action="add" />
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
