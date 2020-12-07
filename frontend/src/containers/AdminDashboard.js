import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AdminNavbar from '../components/AdminNavbar';
import ProductTable from '../components/ProductTable';
import UserTable from '../components/UserTable';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class AdminDashboard extends Component {
    
    render() {
        return (
            <div>
                <AdminNavbar />
                <BrowserRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/user" render={(props) => {
                                return <UserTable/>
                            }} />
                            <Route exact path="/product" render={(props) => {
                                return <ProductTable />
                            }} />
                        </Switch>
                    </React.Suspense>
                </BrowserRouter>
            </div>
        );
    }
}

export default AdminDashboard;