import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title,
  subtitle,
  footer,
  className = '',
  style = {},
  headerAction,
  ...props 
}) => {
  return (
    <div className={`card ${className}`} style={style} {...props}>
      {(title || headerAction) && (
        <div className="card-header">
          <div className="card-title-section">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="card-header-action">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
