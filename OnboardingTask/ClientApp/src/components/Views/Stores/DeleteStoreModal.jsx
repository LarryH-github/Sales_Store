import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class DeleteStoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm() {
        this.props.deleteStore();
        this.setState({ open: false });
    }

    //Controls whether modal can be closed by pressing the escape key and clicking outside the modal (dimmer area)
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false })

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state

        return (
            <div>
                <Button color='red' onClick={this.closeConfigShow(false, false)}>
                    <Icon name='trash' />
                    Delete
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleConfirm}
                            labelPosition='right'
                            icon='delete'
                            color='red'
                            content='Delete'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}