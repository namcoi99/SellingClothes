import React, { Component } from 'react'
import axios from '../../axios'

export default class NewStaffModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeNameList: [],
            storeID: this.props.defaultStoreID ? this.props.defaultStoreID : '',
            name: '',
            phone: '',
            cardID: '',
            role: ''
        }
        if (this.props.role === "admin")
            this.getData();
    }

    getData = () => {
        axios
            .get(`/v1/shops/`)
            .then(data => {
                var storeNameList = data.data.map((store) => {
                    return { id: store.id, name: store.shop_name }
                })
                // console.log(storeNameList);
                this.setState({
                    storeNameList: storeNameList,
                    storeID: storeNameList[0].id
                });
                // console.log(this.state);
            })
            .catch(err => alert(err.message))
    }

    handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios
            .post('/v1/employees', {
                shop_id: this.state.storeID,
                name: this.state.name,
                id_card: this.state.cardID,
                phone: this.state.phone,
                role: this.state.role
            })
            .then(data => {
                console.log('The form was submitted with the following data:');
                console.log(data.data);
                alert("Thêm nhân viên thành công");
                window.location.reload();
            })
            .catch(err => alert(err.message))
    }

    render() {
        return (
            <div>
                <div className="modal fade add-modal" id="newModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document" style={{ maxWidth: "40vw" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    <i className="fas fa-plus-circle"></i> Nhân viên mới</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="container">
                                    {this.props.role === "admin" ? (
                                        <div className="form-group row">
                                            <label htmlFor="store-name" className="col-sm-4 col-form-label">Cửa hàng</label>
                                            <div className="col-sm-8">
                                                <select className="form-control" id="store-name" name="storeID" onChange={this.handleChange}>
                                                    {this.state.storeNameList.map((store) => {
                                                        return (
                                                            <option value={store.id}>{store.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-4 col-form-label">Tên nhân viên</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" id="name" name="name"
                                                value={this.state.name} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="role" className="col-sm-4 col-form-label">Vị trí</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" id="role" name="role"
                                                value={this.state.role} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="card" className="col-sm-4 col-form-label">Card ID</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" id="card" name="cardID"
                                                value={this.state.cardID} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-4 col-form-label">Số điện thoại</label>
                                        <div className="col-sm-8">
                                            <input className="form-control" id="phone" name="phone"
                                                value={this.state.phone} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-success add-button" onClick={this.handleSubmit} data-dismiss="modal">Lưu</button>
                                        </div>
                                    </div>
                                </form>
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
