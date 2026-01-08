// frontend/src/components/ui/Card.jsx
import React from 'react';
import './Card.css';

export const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = true,
  shadow = 'md',
  rounded = 'xl',
  border = true
}) => {
export default Card;
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  return (
    <div 
      className={`
        card
        ${border ? 'card-border' : ''}
        ${shadowClasses[shadow] || shadowClasses.md}
        ${roundedClasses[rounded] || roundedClasses.xl}
        ${hover ? 'card-hover' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '',
  divider = false
}) => {
  return (
    <div className={`card-header ${divider ? 'card-header-divider' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ 
  children, 
  className = '',
  padding = true
}) => {
  return (
    <div className={`card-body ${padding ? 'card-body-padding' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '',
  divider = false
}) => {
  return (
    <div className={`card-footer ${divider ? 'card-footer-divider' : ''} ${className}`}>
      {children}
    </div>
  );
};