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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      {...rest}
    >
      {icon && <span className="">{icon}</span>}
      <span className="text-base tracking-wide">{label}</span>
    </button>
  )
}

export default Button
