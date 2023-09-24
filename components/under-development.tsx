import React from 'react'
import { Heading } from './ui/heading';

interface UnderDevelopmentProps {
  pageName: string;

}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  pageName,
}) => {
  return (
    <div className='h-20 bg-red-600 flex justify-center items-center text-3xl font-mono font-extrabold text-green-500'>
      <Heading title={`${pageName} is under development`} />
    </div>
  )
}

export default UnderDevelopment