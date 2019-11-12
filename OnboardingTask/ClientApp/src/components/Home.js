import React, { Component } from 'react';
import { Button, Icon, Modal, Header, Image } from 'semantic-ui-react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Project Talent - Onboarding Task</h1>
        <p>Please click one of the links in the menu bar above to start testing the application.</p>
      </div>
    );
  }
}
