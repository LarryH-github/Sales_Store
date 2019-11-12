import React from 'react';
import { Container } from 'semantic-ui-react';
import DeleteStoreModal from './DeleteStoreModal';
import CreateStoreModal from './CreateStoreModal';
import UpdateStoreModal from './UpdateStoreModal';

export class FetchStores extends React.Component {
    static displayName = FetchStores.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        this.populateStoreData = this.populateStoreData.bind(this);
        this.updateStore = this.updateStore.bind(this);
        this.createStore = this.createStore.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }

    componentDidMount() {
        this.populateStoreData();
    }
    
    render() {
        let stores = this.state.stores;
        let tableData = null;
        if (stores != "") {
            tableData = stores.map(store =>
                <tr key={store.id}>
                    <td className="two wide">{store.name}</td>
                    <td className="four wide">{store.address}</td>
                    <td className="four wide">
                        <UpdateStoreModal updateStore={this.updateStore.bind(this)} store={store}/>
                    </td>
                    <td className="four wide">
                        <DeleteStoreModal deleteStore={this.deleteStore.bind(this, store.id)} />
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <CreateStoreModal createStore={this.createStore.bind(this)} />
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

    async populateStoreData() {
        const response = await fetch('stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }

    async createStore(store) {
        const response = await fetch('stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(store)
        });
        const data = this.state.stores.concat(await response.json());
        this.setState({ stores: data });
    }

    async updateStore(id, oldStore, updatedStore) {
        const response = await fetch('stores/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStore)
        });
        if (response.ok) {
            const data = this.state.stores;
            data[data.indexOf(oldStore)] = updatedStore;
            this.setState({ stores: data });
        }
    }

    //Create new filtered copy of 'customers' after fetch, then insert new
    //copy into state, instead directly changing original copy within state
    async deleteStore(id) {
        await fetch('stores/' + id, { method: 'DELETE' });
        const data = this.state.stores.filter(store => {
            return (store.id != id);
        });
        this.setState({ stores: data });
    } 
}