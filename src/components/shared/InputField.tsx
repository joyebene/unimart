import React from 'react';

interface InputFieldProps {
    name: string;
    title: string;
    placeholder: string;
    icon?: React.ReactNode;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string
    divClassName?: string;
    className?: string;
}

const InputField = ({name, icon, title, type, value,  placeholder, handleChange, className, divClassName}: InputFieldProps) => {
  return (
    <div className='mt-6 xl:mt-8 flex flex-col gap-2'>
        <label htmlFor={name} className='font-semibold text-sm md:text-base'>{title} <span className='text-red-600'>*</span></label>
        <div className={`flex items-center gap-2 bg-gray-100 py-1 md:py-2 px-2 rounded-xl ${divClassName}`}>
            <div>{icon}</div>
            <input type={type} name={name} value={value} placeholder={placeholder} required onChange={handleChange} className={`w-full p-2 outline-none text-sm md:text-base rounded-xl ${className}`} />
        </div>
      
    </div>
  )
}

export default InputField;