import React from 'react'
import { Button } from './ui/button'
import { Person } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'

interface GenerateRandomUserProps {
  practiceId: string | string[]
}

const GenerateRandomUser:React.FC<GenerateRandomUserProps> = ({
  practiceId
}) => {

  const onClick = async () => {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    const person:Person = data.results[0]

  // firstName    String
  // lastName     String
  // gender       String
  // birthday     DateTime
  // phone        String
  // email        String
  // city         String
  // street       String
  // country      String
  // practiceId   String
    
    const formatted = {
      firstName: person.name.first,
      lastName: person.name.last,
      gender: person.gender,
      birthday: person.dob.date,
      phone: person.phone,
      email: person.email,
      city: person.location.city,
      street: person.location.street.name,
      country: person.location.country,
      practiceId: practiceId
    }

    const res = await axios.post(`/api/${practiceId}/clients`, formatted)

    if(res.status === 200) {
      toast.success("Successfully generated random user")
    } else {
      toast.error("Failed to generate random user")
    }

  }
  return (
    <Button onClick={onClick}>Generate Random User</Button>
  )
}

export default GenerateRandomUser