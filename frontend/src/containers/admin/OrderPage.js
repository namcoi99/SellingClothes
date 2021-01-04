import React, { Component } from 'react';
import axios from '../../axios'

import OrderTable from '../../components/OrderTable';

class OrderPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            results: []
        }
        this.getData(1);
    }

    getData = () => {
        axios
            .get(`order/`)
            .then(data => {
                // console.log(data.data.data.recordset);
                this.setState({
                    total:  data.data.data.total,
                    results: data.data.data.recordset
                });
                console.log(this.state.results);
            })
            .catch(err => alert(err.message))
    }

    render() {
        return (
            <div>
                <div className="container mt-3" style={{minHeight: "80vh"}}>
                    <OrderTable productList={this.state.results}/>
                </div>
            </div>
        );
    }
}

export default OrderPage;