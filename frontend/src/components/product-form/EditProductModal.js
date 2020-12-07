import React, { Component } from 'react'
import ProductForm from './ProductForm'

export default class EditProductModal extends Component {
    render() {
        return (
            <div>
                {/* Modal */}
                <div className="modal fade add-modal" id={`EditItemModal${this.props.item.id}`} tabIndex={-1} role="dialog" aria-labelledby="editModalTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document" style={{ maxWidth: "40vw" }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: "#47c9a2", color: "white" }}>
                                <h5 className="modal-title" id="editModalTitle">
                                    <i className="fas fa-plus-circle"></i> Sửa thông tin sản phẩm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ProductForm item={this.props.item} action="edit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
