import React from 'react';
import { Container } from 'semantic-ui-react';
import DeleteProductModal from './DeleteProductModal';
import CreateProductModal from './CreateProductModal';
import UpdateProductModal from './UpdateProductModal';

export class FetchProducts extends React.Component {
    static displayName = FetchProducts.name;

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };
        this.populateProductsData = this.populateProductsData.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.populateProductsData();
    }
    
    render() {
        let products = this.state.products;
        let tableData = null;
        if (products != "") {
            tableData = products.map(product =>
                <tr key={product.id}>
                    <td className="two wide">{product.name}</td>
                    <td className="four wide">{product.price}</td>
                    <td className="four wide">
                        <UpdateProductModal updateProduct={this.updateProduct.bind(this)} product={product}/>
                    </td>
                    <td className="four wide">
                        <DeleteProductModal deleteProduct={this.deleteProduct.bind(this, product.id)} />
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <CreateProductModal createProduct={this.createProduct.bind(this)} />
                <Container>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="four wide">Price</th>
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

    async populateProductsData() {
        const response = await fetch('products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }

    async createProduct(product) {
        const response = await fetch('products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        const data = this.state.products.concat(await response.json());
        this.setState({ products: data });
    }

    async updateProduct(id, oldProduct, updatedProduct) {
        const response = await fetch('products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });
        if (response.ok) {
            const data = this.state.products;
            data[data.indexOf(oldProduct)] = updatedProduct;
            this.setState({ products: data });
        }
    }

    //Create new filtered copy of 'customers' after fetch, then insert new
    //copy into state, instead directly changing original copy within state
    async deleteProduct(id) {
        await fetch('products/' + id, { method: 'DELETE' });
        const data = this.state.products.filter(products => {
            return (products.id != id);
        });
        this.setState({ products: data });
    } 
}