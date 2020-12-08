import React, { Component } from 'react';
import axios from '../axios'

import AdminNavbar from '../components/AdminNavbar';
import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';

const pageSize = 4;

class AdminDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            results: [],
            currentPageNumber: 1,
            maxPageNumber: 1,
        }
        this.getData(1);
    }

    getData = (pageNumber) => {
        axios
            .get(`/product?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(data => {
                // console.log(data.data.data.recordset);
                this.setState({
                    total:  data.data.data.total,
                    results: data.data.data.recordset,
                    maxPageNumber: Math.ceil(data.data.data.total / pageSize)
                });
                // console.log(this.state.results);
            })
            .catch(err => alert(err.message))
    }

    handlePageChange = (pageNumber) => {
        this.getData(pageNumber);
        this.setState({
            currentPageNumber: pageNumber
        });
    }

    handlePrevClick = () => {
        if (this.state.currentPageNumber > 1) {
            this.getData(this.state.currentPageNumber - 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber - 1)
            });
        }
    }

    handleNextClick = () => {
        if (this.state.currentPageNumber < this.state.maxPageNumber) {
            this.getData(this.state.currentPageNumber + 1);
            this.setState({
                currentPageNumber: (this.state.currentPageNumber + 1)
            });
        }
    }

    render() {
        const paginations = [];
        for (let i = 1; i <= this.state.maxPageNumber; i++) {
            paginations.push(i);
        }

        return (
            <div>
                {/* <UserTable /> */}
                <div className="container mt-3">
                    <ProductTable productList={this.state.results}/>
                </div>

                {/* Pagination */}
                <nav className="d-flex justify-content-center mb-4">
                    <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                        <li className={`page-item ${this.state.currentPageNumber === 1 ? 'disabled' : ''}`}
                            onClick={this.handlePrevClick}>
                            <a className="page-link no-border" href="#">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {paginations.map((item) => {
                            return (
                                <li className={`page-item ${item === this.state.currentPageNumber ? 'active' : ''}`}
                                    key={item}
                                    onClick={() => { this.handlePageChange(item) }}
                                >
                                    <a className="page-link" href="#">{item}</a>
                                </li>
                            );
                        })}
                        <li className={`page-item ${this.state.currentPageNumber === this.state.maxPageNumber ? 'disabled' : ''}`}
                            onClick={this.handleNextClick}>
                            <a className="page-link no-border" href="#">
                                <span aria-hidden="true">»</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* End Pagination */}
            </div>
        );
    }
}

export default AdminDashboard;