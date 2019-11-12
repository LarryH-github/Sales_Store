import React from 'react';
import { Container } from 'semantic-ui-react';
import DeleteCustomerModal from './DeleteCustomerModal';
import CreateCustomerModal from './CreateCustomerModal';
import UpdateCustomerModal from './UpdateCustomerModal';

export class FetchCustomers extends React.Component {
    static displayName = FetchCustomers.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
        this.populateCustomerData = this.populateCustomerData.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }
    
    render() {
        let customers = this.state.customers;
        let tableData = null;
        if (customers != "") {
            tableData = customers.map(customer =>
                <tr key={customer.id}>
                    <td className="two wide">{customer.name}</td>
                    <td className="four wide">{customer.address}</td>
                    <td className="four wide">
                        <UpdateCustomerModal updateCustomer={this.updateCustomer.bind(this)} customer={customer}/>
                    </td>
                    <td className="four wide">
                        <DeleteCustomerModal deleteCustomer={this.deleteCustomer.bind(this, customer.id)} />
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <CreateCustomerModal createCustomer={this.createCustomer.bind(this)} />
                <Container>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="four wide">Actions</th>
                                <th className="four wide">Actions</th>
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

    async populateCustomerData() {
        const response = await fetch('customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    async createCustomer(customer) {
        const response = await fetch('customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        });
        const data = this.state.customers.concat(await response.json());
        this.setState({ customers: data });
    }

    async updateCustomer(id, oldCustomer, updatedCustomer) {
        const response = await fetch('customers/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        });
        if (response.ok) {
            const data = this.state.customers;
            data[data.indexOf(oldCustomer)] = updatedCustomer;
            this.setState({ customers: data });
        }
    }

    //Create new filtered copy of 'customers' after fetch, then insert new
    //copy into state, instead directly changing original copy within state
    async deleteCustomer(id) {
        await fetch('customers/' + id, { method: 'DELETE' });
        const data = this.state.customers.filter(customer => {
            return (customer.id != id);
        });
        this.setState({ customers: data });
    } 
}