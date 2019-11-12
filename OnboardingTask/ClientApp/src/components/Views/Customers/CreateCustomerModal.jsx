import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

export default class CreateCustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            open: false
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleConfirm() {
        const customer = { name: this.state.name, address: this.state.address };
        this.props.createCustomer(customer);
        this.setState({ name: '', address: '', open: false });
    }

    //Controls whether modal can be closed by pressing the escape key and clicking outside the modal (dimmer area)
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({ name: '', address: '', open: false })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;
        const submitEnabled = (this.state.name != '');

        return (
            <div>
                <Button color='blue' onClick={this.closeConfigShow(false, false)}>
                    New Customer
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.handleCancel}
                >
                    <Modal.Header>Create Customer</Modal.Header>
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
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleChange.bind(this)}
                                    placeholder='Address'
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