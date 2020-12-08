import React, { Component } from 'react'
import axios from '../axios'

import DelConfirmModal from './DelConfirmModal'
import EditUserModal from './user-form/EditUserModal'
import NewUserModal from './user-form/NewUserModal'

export default class UserTable extends Component {
    state = {
        defaultStoreID: this.props.defaultStoreID ? this.props.defaultStoreID : ''
    }

    handleDelete = (staffID) => {
        // console.log(this.props.storeID);
        axios
            .delete(`/v1/employees/${staffID}`)
            .then(data => {
                console.log(data.data);
                alert("Xóa nhân viên thành công");
                window.location.reload();
            })
            .catch(err => alert(err.message))
    }

    render() {
        return (
            <div>
                <h1>hello
                    
                </h1>
                <button type="button" className="btn btn-dark mb-3" data-toggle="modal" data-target="#newModal">
                    <i className="fas fa-plus mr-2" />Thêm nhân viên
                </button>
                <div className="card card-employee card-margin">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-striped mb-0">
                                        <thead className="table-dark">
                                            <tr>
                                                {this.props.role == "admin" ? (<th scope="col">Cửa hàng</th>) : null}
                                                <th scope="col">Tên</th>
                                                <th scope="col">Card ID</th>
                                                <th scope="col">Vị trí</th>
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Staff List */}
                                            {this.props.staffList.map((staff) => {
                                                return (
                                                    <tr>
                                                        {this.props.role == "admin" ? (<th scope="row">Cửa hàng {staff.shop_name}</th>) : null}
                                                        <td>{staff.name}</td>
                                                        <td>{staff.id_card}</td>
                                                        <td>{staff.role}</td>
                                                        <td>{staff.phone}</td>
                                                        <td>
                                                            <div className="widget-26-job-starred text-right">
                                                                <button type="button" className="btn btn-outline-danger btn-sm mr-2"
                                                                    data-toggle="modal" data-target={`#editModal${staff.id}`}>
                                                                    <i className="fas fa-edit"></i></button>
                                                                <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target={`#delModal${staff.id}`}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>

                                                            <EditUserModal staff={staff} role={this.props.role} />
                                                            <DelConfirmModal objectID={staff.id} deleteMethod={this.handleDelete} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <NewUserModal defaultStoreID={this.state.defaultStoreID} role={this.props.role} />
            </div>
        )
    }
}
