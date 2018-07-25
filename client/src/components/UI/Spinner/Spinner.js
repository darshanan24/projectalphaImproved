import React from 'react';

import './Spinner.css';

const spinner = () => (
  <div id="loading-wrapper">
    <div id="loader">
      <div className="line1" />
      <div className="line2" />
      <div className="line3" />
      <div className="line4" />
      <div className="line5" />
    </div>
  </div>
);

export default spinner;
