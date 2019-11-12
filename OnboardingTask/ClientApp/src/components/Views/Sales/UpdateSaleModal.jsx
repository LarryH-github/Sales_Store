import React, { Component } from 'react'
import { Button, Icon, Modal, Form, Dropdown } from 'semantic-ui-react'

export default class UpdateSaleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.sale.id,
            oldProductId: this.props.sale.productId,
            oldCustomerId: this.props.sale.customerId,
            oldStoreId: this.props.sale.storeId,
            oldDateSold: this.props.sale.dateSold,
            newProductId: this.props.sale.productId,
            newCustomerId: this.props.sale.customerId,
            newStoreId: this.props.sale.storeId,
            newDateSold: this.props.sale.dateSold,
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
        for (var targetObject of targetList) {
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
        if (parseInt(this.state.oldProductId) != parseInt(this.state.newProductId)
            || parseInt(this.state.oldCustomerId) != parseInt(this.state.newCustomerId)
            || parseInt(this.state.oldStoreId) != parseInt(this.state.newStoreId)
            || this.state.oldDateSold != this.state.newDateSold)
        {
            const updatedSale = {
                id: this.state.id,
                productId: parseInt(this.state.newProductId),
                customerId: parseInt(this.state.newCustomerId),
                storeId: parseInt(this.state.newStoreId),
                dateSold: this.state.newDateSold
            };
            this.props.updateSale(this.state.id, this.props.sale, updatedSale);
        }
        this.setState({
            oldProductId: parseInt(this.state.newProductId),
            oldCustomerId: parseInt(this.state.newCustomerId),
            oldStoreId: parseInt(this.state.newStoreId),
            oldDateSold: this.state.newDateSold,
            open: false
        });
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({
        newProductId: parseInt(this.state.oldProductId),
        newCustomerId: parseInt(this.state.oldCustomerId),
        newStoreId: parseInt(this.state.oldStoreId),
        newDateSold: this.state.oldDateSold,
        open: false
    })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        const submitEnabled = (
            this.state.newCustomerId != null
            && this.state.newProductId != null
            && this.state.newDateSold != null
        );

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
                    <Modal.Header>Edit Sales</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label htmlFor="newDateSold">Date Sold (Required)</label>
                                <input
                                    type="date"
                                    required="required"
                                    name="newDateSold"
                                    value={this.state.newDateSold}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder={this.state.newDateSold}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="newCustomerId">Customer</label>
                                <Dropdown
                                    name="newCustomerId"
                                    placeholder={this.props.getDataName("customers", this.state.newCustomerId)}
                                    fluid
                                    selection
                                    options={this.getDataNamesList("customers")}
                                    onChange={this.handleDropdownChange}
                                />
                                <label htmlFor="newProductId">Product</label>
                                <Dropdown
                                    name="newProductId"
                                    placeholder={this.props.getDataName("products", this.state.newProductId)}
                                    fluid
                                    selection
                                    options={this.getDataNamesList("products")}
                                    onChange={this.handleDropdownChange}
                                />
                                <label htmlFor="newStoreId">Store</label>
                                <Dropdown
                                    name="newStoreId"
                                    placeholder={this.props.getDataName("stores", this.state.newStoreId)}
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
                            content='Edit'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}