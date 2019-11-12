import React, { Component } from 'react'
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react'

export default class CreateSaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: null,
            customerId: null,
            storeId: null,
            dateSold: null,
            open: false
        };
        this.handleConfirm = this.handleConfirm.bind(this);
        this.getDataNamesList = this.getDataNamesList.bind(this);
    }

    getDataNamesList(dataList) {
        let dataNamesList = [];
        let targetList = null;
        if (dataList == "customers") {
            targetList = this.props.customers;
        }
        else if (dataList == "products") {
            targetList = this.props.products;
        }
        else {
            targetList = this.props.stores;
        }
        for (var targetObject of targetList) { //Same as for-each, except javascript uses for-of
            dataNamesList.push({
                key: targetObject.name,
                text: targetObject.name,
                value: targetObject.id
            });
        }
        return dataNamesList;
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleDropdownChange = (event, data) => {
        this.setState({ [data.name]: data.value })
    }

    handleConfirm() {
        console.log(this.state);
        const sale = {
            productId: parseInt(this.state.productId),
            customerId: parseInt(this.state.customerId),
            storeId: parseInt(this.state.storeId),
            dateSold: this.state.dateSold
        };
        this.props.createSale(sale);
        this.setState({
            customerId: null,
            productId: null,
            storeId: null,
            dateSold: null,
            open: false
        });
    }

    //Controls whether modal can be closed by pressing the escape key and clicking outside the modal (dimmer area)
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({
        customerId: null,
        productId: null,
        storeId: null,
        dateSold: null,
        open: false
    })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;
        const submitEnabled = (
            this.state.customerId != null
            && this.state.productId != null
            && this.state.dateSold != null
        );

        return (
            <div>
                <Button color='blue' onClick={this.closeConfigShow(false, false)}>
                    New Sale
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.handleCancel}
                >
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label htmlFor="dateSold">Date Sold (Required)</label>
                                <input
                                    type="date"
                                    required="required"
                                    name="dateSold"
                                    value={this.state.dateSold}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder='Date'
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="customerId">Customer</label>
                                <Dropdown
                                    name="customerId"
                                    placeholder='Select Customer (Required)'
                                    fluid
                                    selection
                                    options={this.getDataNamesList("customers")}
                                    onChange={this.handleDropdownChange}
                                />
                                <label htmlFor="productId">Product</label>
                                <Dropdown
                                    name="productId"
                                    placeholder='Select Product (Required)'
                                    fluid
                                    selection
                                    options={this.getDataNamesList("products")}
                                    onChange={this.handleDropdownChange}
                                />
                                <label htmlFor="storeId">Store</label>
                                <Dropdown
                                    name="storeId"
                                    placeholder='Select Store'
                                    fluid
                                    selection
                                    options={this.getDataNamesList("stores")}
                                    onChange={this.handleDropdownChange}
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

    friendOptions = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',
        },
        {
            key: 'Stevie Feliciano',
            text: 'Stevie Feliciano',
            value: 'Stevie Feliciano',
        },
    ]
}