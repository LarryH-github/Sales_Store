import React, { Component } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

export default class UpdateProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.product.id,
            oldName: this.props.product.name,
            oldPrice: this.props.product.price,
            newName: this.props.product.name,
            newPrice: this.props.product.price,
            sales: this.props.product.sales,
            open: false
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleConfirm() {
        if (!isNaN(parseFloat(this.state.newPrice))) { //isNaN -> isNotaNumber
            if (this.state.oldName != this.state.newName || parseFloat(this.state.oldPrice) != parseFloat(this.state.newPrice)) {
                const updatedProduct = { id: this.state.id, name: this.state.newName, price: parseFloat(this.state.newPrice), sales: this.state.sales };
                this.props.updateProduct(this.state.id, this.props.product, updatedProduct);
            }
            this.setState({ oldName: this.state.newName, oldPrice: parseFloat(this.state.newPrice), open: false });
        }
        else {
            this.setState({ newPrice: parseFloat(this.state.oldPrice), open: false });
        }
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({ newName: this.state.oldName, newPrice: parseFloat(this.state.oldPrice), open: false })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        const submitEnabled = (this.state.newName != '' && this.state.newPrice != '');

        return (
            <div>
                <Button color='yellow' onClick={this.closeConfigShow(false, false)}>
                    <Icon name='edit' />
                    Edit
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.handleCancel}
                >
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label htmlFor="newName">Name</label>
                                <input
                                    type="text"
                                    name="newName"
                                    value={this.state.newName}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder='Name (Required)'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="newPrice">Price</label>
                                <input
                                    type="number"
                                    name="newPrice"
                                    step="0.01"
                                    value={this.state.newPrice}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder='Price'
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleConfirm}
                            labelPosition='right'
                            icon='check'
                            color='green'
                            disabled={!submitEnabled}
                            content='Edit'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}