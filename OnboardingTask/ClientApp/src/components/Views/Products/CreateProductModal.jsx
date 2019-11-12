import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CreateProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: null,
            open: false
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleConfirm() {
        let product = { name: this.state.name, price: 0 };
        if (!isNaN(parseFloat(this.state.price))) { //NaN -> Not-a-Number
            product = { name: this.state.name, price: parseFloat(this.state.price) };
        }
        this.props.createProduct(product);
        this.setState({ name: '', price: null, open: false });
    }

    //Controls whether modal can be closed by pressing the escape key and clicking outside the modal (dimmer area)
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({ name: '', price: null, open: false })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;
        const submitEnabled = (this.state.name != '' && this.state.price != '');

        return (
            <div>
                <Button color='blue' onClick={this.closeConfigShow(false, false)}>
                    New Product
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.handleCancel}
                >
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder='Name (Required)'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    value={this.state.price}
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
                            content='Create'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}