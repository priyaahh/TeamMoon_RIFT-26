import React from 'react'

export const Button = ({ className = '', variant = 'primary', ...props }) => {
  const variantClass =
    variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'outline'
        ? 'btn-outline'
        : variant === 'danger'
          ? 'btn-danger'
          : 'btn-primary'

  return <button className={`btn ${variantClass} ${className}`.trim()} {...props} />
}

export default Button

