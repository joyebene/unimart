import React from 'react'

interface ButtonProps {
    text: string;
    className?: string;
    disabled?: boolean
}

const Button = ({text, className, disabled}: ButtonProps) => {
  return (
    <button type="submit" className={`${className} bg-[#f7DC67] shadow-md text-white px-3 py-2 sm:px-4 md:py-3 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 mt-4 md:mt-6 xl:mt-8 text-sm md:text-base font-semibold cursor-pointer`} disabled={disabled}>{text}</button>
  )
}

export default Button;