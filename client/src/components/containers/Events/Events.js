import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';

class Events extends Component {
  render() {
    return (
      <Aux>
        <ContentHeadingLayout>
          <h5>Events HEADING</h5>
          <h6 className="sub-heading">This is the subheading</h6>
        </ContentHeadingLayout>
        <ContentBodyLayout>
          <div>Event Creation </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

export default Events;
