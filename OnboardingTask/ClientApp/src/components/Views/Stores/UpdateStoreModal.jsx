import React, { Component } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

export default class UpdateStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.store.id,
            oldName: this.props.store.name,
            oldAddress: this.props.store.address,
            newName: this.props.store.name,
            newAddress: this.props.store.address,
            sales: this.props.store.sales,
            open: false
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleConfirm() {
        if (this.state.oldName != this.state.newName || this.state.oldAddress != this.state.newAddress) {
            const updatedStore = { id: this.state.id, name: this.state.newName, address: this.state.newAddress, sales: this.state.sales };
            this.props.updateStore(this.state.id, this.props.store, updatedStore);
        }
        this.setState({ oldName: this.state.newName, oldAddress: this.state.newAddress, open: false });
    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    handleCancel = () => this.setState({ newName: this.state.oldName, newAddress: this.state.oldAddress, open: false })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        const submitEnabled = (this.state.newName != '');

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
                    <Modal.Header>Edit Store</Modal.Header>
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
                                <label htmlFor="newAddress">Address</label>
                                <input
                                    type="text"
                                    name="newAddress"
                                    value={this.state.newAddress}
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
                            content='Edit'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}