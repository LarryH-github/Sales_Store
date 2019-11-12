import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Menu, Segment } from 'semantic-ui-react'

export class NavMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/fetch-customers"
                        name='Customers'
                        active={activeItem === 'Customers'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/fetch-products"
                        name='Products'
                        active={activeItem === 'Products'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/fetch-stores"
                        name='Stores'
                        active={activeItem === 'Stores'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/fetch-sales"
                        name='Sales'
                        active={activeItem === 'Sales'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </Segment>
        )
    }
}