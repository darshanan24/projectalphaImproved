import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import ContentHeadingLayout from '../../Layout/ContentHeadingLayout/ContentHeadingLayout';
import ContentBodyLayout from '../../Layout/ContentBodyLayout/ContentBodyLayout';

class Project extends Component {
  render() {
    return (
      <Aux>
        <ContentHeadingLayout
          heading="PROJECT"
          subheading="This is a good project"
        />
        <ContentBodyLayout>
          <div>New Project Creation </div>
        </ContentBodyLayout>
      </Aux>
    );
  }
}

export default Project;
