// frontend/src/components/ui/Button.jsx
import React from 'react';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
export default Button;
  const baseClasses = 'btn inline-flex items-center justify-center';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || 'btn-primary'}
        ${sizeClasses[size] || 'btn-md'}
        ${disabled ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}
        ${loading ? 'cursor-wait' : ''}
        ${className}
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <div className={`btn-spinner ${iconSizeClasses[size]}`}></div>
          {children && <span className="ml-2">{children}</span>}
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={`btn-icon-left ${iconSizeClasses[size]} ${children ? 'mr-2' : ''}`} />
          )}
          {children && <span>{children}</span>}
          {Icon && iconPosition === 'right' && (
            <Icon className={`btn-icon-right ${iconSizeClasses[size]} ${children ? 'ml-2' : ''}`} />
          )}
        </>
      )}
    </button>
  );
};