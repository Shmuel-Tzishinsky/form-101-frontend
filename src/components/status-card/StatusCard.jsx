import React from 'react';
import { useNavigate } from 'react-router';

import './statuscard.css';

const StatusCard = ({ icon, count, title, nav }) => {
  const navigate = useNavigate();

  return (
    <div className="status-card" onClick={() => navigate(nav)}>
      <div className="status-card__icon">
        <i className={icon}></i>
      </div>
      <div className="status-card__info">
        <h4>{count}</h4>
        <span
          style={{
            whiteSpace: 'nowrap',
            fontSize: '1.4rem',
            fontWeight: 'bold'
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
