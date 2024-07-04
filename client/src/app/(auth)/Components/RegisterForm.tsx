"use client"

import { signUp } from '@/app/api/ApiContext';
import { offers } from '@/app/types/constants';
import { RegisterUser } from '@/app/types/types';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function RegisterForm() {
    const searchParam = useSearchParams();
    const offer = searchParam.get("offer");

    const initialValue : RegisterUser = {
        fullName : "",
        email : "",
        password : "",
        offerNumber: offer === "free" ? 1 : (offer === "premium" ? 2 : 1),
        schoolName: "",
        signUp() {
            signUp(this);
        },
    };
    const [inputs , setInputs] = useState<RegisterUser>(initialValue);

    function handleInputsChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setInputs({...inputs , [e.target.name] : e.target.value});
    };

    function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        inputs.signUp();
    };


  return (
    <div className='w-1/3 mx-auto '>
        <form className='flex flex-col items-center gap-4'>
            <Input className='text-white' color='secondary' variant='bordered' type='text' label="Name" name='fullName' value={inputs.fullName} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='secondary' variant='bordered' type='email' label="Email" name='email' value={inputs.email} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='secondary' variant='bordered' type='password' label="Password" name='password' value={inputs.password} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='secondary' variant='bordered' type='text' label="School Name" name='schoolName' value={inputs.schoolName} onChange={(e) => handleInputsChange(e)} />
            {
                !offer &&  <Select
                label="Your Plan Within the App"
                placeholder="Select a Plan"
                className="max-w-xs"
                onChange={(e) => {
                    if(e.target.value === "free"){
                        setInputs({...inputs , offerNumber : 1})
                    }
                    else if(e.target.value === "premium"){
                        setInputs({...inputs , offerNumber : 2})
                    };
                }}
                name='offerNumber'
                variant='bordered'
                color='secondary'
                fullWidth={true}
                classNames={{
                    listbox: "bg-gray-950 text-white",
                    popoverContent: "bg-gray-950",
                  }}
                
                >
                    {(offers).map((offer) => (
                        <SelectItem key={offer.title}>
                            {offer.title}
                        </SelectItem>
                    ))}
                    
            </Select>  
            }
            <Button color='secondary' variant='shadow' className='w-24 text-white' onClick={(e) => handleFormSubmit(e)}>Register</Button>
        </form>
    </div>
  )
}
