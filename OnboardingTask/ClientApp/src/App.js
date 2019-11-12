import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCustomers } from './components/Views/Customers/FetchCustomers';
import { FetchProducts } from './components/Views/Products/FetchProducts';
import { FetchStores } from './components/Views/Stores/FetchStores';
import { FetchSales } from './components/Views/Sales/FetchSales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-customers' component={FetchCustomers} />
        <Route path='/fetch-products' component={FetchProducts} />
        <Route path='/fetch-stores' component={FetchStores} />
        <Route path='/fetch-sales' component={FetchSales} />
      </Layout>
    );
  }
}
