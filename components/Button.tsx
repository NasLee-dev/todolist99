'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number
  height: number
  label: string
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  width,
  height,
  label,
  icon,
  ...rest
}) => {
  return (
    <button
      style={{
        width: `${width}px`,
        height: `${height}px`,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      {...rest}
    >
      <p className="text-white font-semibold leading-3">{label}</p>
      {icon}
    </button>
  )
}

export default Button
