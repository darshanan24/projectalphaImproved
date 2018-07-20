import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import './ContentHeadingLayout.css';
import PropTypes from 'prop-types';

class ContentHeadingLayout extends Component {
  render() {
    return (
      <Aux>
        <div className="main-heading">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                <div className="page-title">
                  <h5>{this.props.heading}</h5>
                  <h6 className="sub-heading">{this.props.subheading}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

ContentHeadingLayout.propTypes = {
  heading: PropTypes.string.isRequired
};

export default ContentHeadingLayout;
