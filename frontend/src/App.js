import React, { Component, Suspense, lazy } from 'react';
import axios from './axios.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import Home from './containers/Home';
// import Product from './components/Product';
// import Menu from './components/Menu';
// import Cart from './components/Cart';
// import OrderList from './components/OrderList';
// import OrderDetail from './components/OrderDetail';
// import OrderListSearch from './components/OrderListSearch.js';
// import ProductPage from './containers/admin/ProductPage.js';
// import AdminNavbar from './components/AdminNavbar.js';
// import Footer from './components/Footer.js';
// import OrderPage from './containers/admin/OrderPage.js';

const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./components/SignUp'));
const Home = lazy(() => import('./containers/Home'));
const Product = lazy(() => import('./components/Product'));
const Menu = lazy(() => import('./components/Menu'));
const Cart = lazy(() => import('./components/Cart'));
const OrderList = lazy(() => import('./components/OrderList'));
const OrderDetail = lazy(() => import('./components/OrderDetail'));
const OrderListSearch = lazy(() => import('./components/OrderListSearch'));
const ProductPage = lazy(() => import('./containers/admin/ProductPage'));
const AdminNavbar = lazy(() => import('./components/AdminNavbar'));
const Footer = lazy(() => import('./components/Footer'));
const OrderPage = lazy(() => import('./containers/admin/OrderPage'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


class App extends Component {
  state = {
    products: [],
    count: 0,
    Total: 0
  }

  componentDidMount() {
    axios.get(`http://localhost:5001/${localStorage.getItem('username')}`)
      .then(data => {
        this.setState({
          products: data.data.data
        })
        this.state.products.map(item => {
          this.setState({
            Total: this.state.Total + item.Price * item.Quantity,
          })
          this.setState({ count: this.state.count + item.Quantity })
        })
      })
      .catch(err => console.log(err))
  }

  _onLogin = (username, password) => {
    axios.post('http://localhost:5002/login', {
      username: username,
      password: password
    })
      .then(response => {
        if (response.data.success !== false) {
          this.setState({
            username: response.data.username,
            id: response.data.id
          })
          localStorage.setItem('username', response.data.username)
          if (response.data.username == 'admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        }
        else {
          alert("Wrong username or password");
        }
      })
      .catch(err => console.log(err))
  }

  _checkAdmin = function () {
    if (window.localStorage.getItem('username') !== 'admin') {
      alert("You do not have permission to access");
      window.location.href = "/"
    }
  };

  _addtoCart = (item, quantity, event) => {
    event.preventDefault();
    const username = localStorage.getItem('username');
    if (username) {
      axios.post(`http://localhost:5001`, {
        username: username,
        productID: item.ProductID,
        quantity: quantity,
        name: item.Name,
        image: item.Image
      })
        .then(response => {
          console.log(response.data.success)
        })
        .catch(err => console.log(err));
      axios.get(`http://localhost:5001/${localStorage.getItem('username')}`)
        .then(data => {
          this.setState({
            products: data.data.data
          })
        })
        .catch(err => console.log(err));
      this.setState({
        count: this.state.count + quantity,
        Total: this.state.Total + item.Price * quantity
      })
    }
    else {
      alert('You must log in first');
    }
  }

  Decrease = (item, event) => {
    event.preventDefault();
    if (item.Quantity > 1) {
      item.Quantity--;
      this.setState({
        count: this.state.count - 1,
        Total: this.state.Total - item.Price
      });
      axios.put('http://localhost:5001', {
        quantity: item.Quantity,
        username: localStorage.getItem('username'),
        productID: item.ProductID
      })
        .then(response => {
          console.log(response.data.success)
        })
        .catch(err => console.log(err));
    }
  }

  Increase = (item, event) => {
    event.preventDefault();
    item.Quantity++;
    this.setState({
      count: this.state.count + 1,
      Total: this.state.Total + item.Price
    })
    this.setState({ Total: this.state.Total + item.Price });
    axios.put('http://localhost:5001', {
      quantity: item.Quantity,
      username: localStorage.getItem('username'),
      productID: item.ProductID
    })
      .then(response => {
        console.log(response.data.success)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" render={(props) => {
                return <Home {...props} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/admin" checkAdmin={this._checkAdmin} render={() => {
                return (
                  <div>
                    <AdminNavbar />
                    <ProductPage />
                  </div>
                )
              }} />
              <Route exact path="/admin/order-list" checkAdmin={this._checkAdmin} render={() => {
                return (
                  <div>
                    <AdminNavbar />
                    <OrderPage />
                  </div>
                )
              }} />
              <Route exact path="/signin" render={(props) => {
                return <SignIn {...props} state={this.state} _onLogin={this._onLogin} />
              }} />
              <Route exact path="/product/:productID" render={(props) => {
                return <Product {...props} addtoCart={this._addtoCart} state={this.state} />
              }} />
              <Route exact path="/signup" render={(props) => {
                return <SignUp {...props} state={this.state} />
              }} />
              <Route exact path="/cart" render={(props) => {
                return <Cart {...props} Decrease={this.Decrease} Increase={this.Increase} state={this.state} />
              }} />
              <Route exact path="/order-list" render={(props) => {
                return <OrderList {...props} state={this.state} />
              }} />
              <Route exact path="/order-detail/:orderID" render={(props) => {
                return <OrderDetail {...props} state={this.state} />
              }} />
              <Route exact path="/Shirt" render={(props) => {
                return <Menu {...props} addtoCart={this._addtoCart} state={this.state} category={"Shirt"} />
              }} />
              <Route exact path="/Pant" render={(props) => {
                return <Menu {...props} addtoCart={this._addtoCart} state={this.state} category={"Pants"} />
              }} />
              <Route exact path="/Bag" render={(props) => {
                return <Menu {...props} addtoCart={this._addtoCart} state={this.state} category={"Bag"} />
              }} />
              <Route exact path="/order/list/:orderID" render={(props) => {
                return <OrderListSearch {...props} state={this.state} />
              }} />
            </Switch>
            <Footer/>
          </Suspense>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
