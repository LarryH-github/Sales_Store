import React from 'react';
import { Container } from 'semantic-ui-react';
import DeleteSaleModal from './DeleteSaleModal';
import CreateSaleModal from './CreateSaleModal';
import UpdateSaleModal from './UpdateSaleModal';

export class FetchSales extends React.Component {
    static displayName = FetchSales.name;

    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            products: [],
            customers: [],
            stores: [],
            loading: true
        };
        this.populateAllData = this.populateAllData.bind(this);
        this.updateSale = this.updateSale.bind(this);
        this.createSale = this.createSale.bind(this);
        this.deleteSale = this.deleteSale.bind(this);
        this.getDataName = this.getDataName.bind(this);
    }

    componentDidMount() {
        this.populateAllData();
    }
    
    render() {
        let sales = this.state.sales;
        let tableData = null;
        if (sales != "") {
            tableData = sales.map(sale =>
                <tr key={sale.id}>
                    <td className="three wide">{this.getDataName("customers", sale.customerId)}</td>
                    <td className="three wide">{this.getDataName("products", sale.productId)}</td>
                    <td className="three wide">{this.getDataName("stores", sale.storeId)}</td>
                    <td className="three wide">{sale.dateSold}</td>
                    <td className="two wide">
                        <UpdateSaleModal updateSale={this.updateSale.bind(this)}
                            getDataName={this.getDataName.bind(this)}
                            products={this.state.products}
                            customers={this.state.customers}
                            stores={this.state.stores}
                            sale={sale}
                        />
                    </td>
                    <td className="two wide">
                        <DeleteSaleModal deleteSale={this.deleteSale.bind(this, sale.id)} />
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <CreateSaleModal createSale={this.createSale.bind(this)}
                    products={this.state.products}
                    customers={this.state.customers}
                    stores={this.state.stores}
                />
                <Container>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="three wide">Customer</th>
                                <th className="three wide">Product</th>
                                <th className="three wide">Store</th>
                                <th className="three wide">Date Sold</th>
                                <th className="two wide">Actions</th>
                                <th className="two wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </Container>
            </React.Fragment>
        )
    }

    async populateAllData() {
        const salesResponse = await fetch('sales');
        const salesData = await salesResponse.json();

        const productsResponse = await fetch('products');
        const productsData = await productsResponse.json();

        const customersResponse = await fetch('customers');
        const customersData = await customersResponse.json();

        const storesResponse = await fetch('stores');
        const storesData = await storesResponse.json();

        this.setState({
            sales: salesData,
            products: productsData,
            customers: customersData,
            stores: storesData,
            loading: false
        });
    }

    async createSale(sale) {
        const response = await fetch('sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sale)
        });
        const data = this.state.sales.concat(await response.json());
        this.setState({ sales: data });
    }

    async updateSale(id, oldSale, updatedSale) {
        const response = await fetch('sales/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSale)
        });
        if (response.ok) {
            const data = this.state.sales;
            data[data.indexOf(oldSale)] = updatedSale;
            this.setState({ sales: data });
        }
    }

    //Create new filtered copy of 'customers' after fetch, then insert new
    //copy into state, instead directly changing original copy within state
    async deleteSale(id) {
        await fetch('sales/' + id, { method: 'DELETE' });
        const data = this.state.sales.filter(sale => {
            return (sale.id != id);
        });
        this.setState({ sales: data });
    }

    getDataName(dataList, id) {
        let data = null;
        if (id != null) {
            if (dataList == "customers") {
                data = this.state.customers.find(data => data.id === id);
            }
            else if (dataList == "products") {
                data = this.state.products.find(data => data.id === id);
            }
            else { //dataList == "stores"
                data = this.state.stores.find(data => data.id === id);
            }
        }
        if (data != null) {
            return data.name;
        }
        else {
            return "";
        }
    }
}