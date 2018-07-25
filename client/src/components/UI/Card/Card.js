import React from 'react';
import './Card.css';
const card = props => (
  <div className="card">
    <div className="card-body">
      <div className="stats-widget">
        <div className="stats-widget-header">
          <h6>{props.header}</h6>
        </div>
        <div className="stats-widget-body">
          <ul className="row no-gutters">
            <li>
              <h4 className="total">{props.total}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default card;
