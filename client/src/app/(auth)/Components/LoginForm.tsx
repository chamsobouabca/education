"use client"

import { signIn } from '@/app/api/ApiContext';
import { roles } from '@/app/types/constants';
import { LoginUser } from '@/app/types/types';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react'


export default function LoginForm() {
    const initialValue : LoginUser = {
        email : "",
        password : "",
        role : "",
        signIn(){
            signIn(this);
        },
    };
    const [inputs , setInputs] = useState<LoginUser>(initialValue);

    function handleInputsChange(e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setInputs({...inputs , [e.target.name] : e.target.value});
    };

    function handleFormSubmit(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        inputs.signIn();
    };
  return (
    <div className='w-1/3 mx-auto '>
        <form className='flex flex-col items-center gap-4'>
            <Input className='text-white' color='secondary' variant='bordered' type='email' label="Email" name='email' value={inputs.email} onChange={(e) => handleInputsChange(e)} />
            <Input className='text-white' color='secondary' variant='bordered' type='password' label="Password" name='password' value={inputs.password} onChange={(e) => handleInputsChange(e)} />
            <Select
                label="Your Role in the Institution"
                placeholder="Select a role"
                className="max-w-xs"
                value={inputs.role}
                onChange={(e) => handleInputsChange(e)}
                name='role'
                variant='bordered'
                color='secondary'
                fullWidth={true}
                classNames={{
                    listbox: "bg-gray-950 text-white",
                    popoverContent: "bg-gray-950",
                  }}
                
                >
                    {(roles).map((role) => (
                        <SelectItem key={role.key}>
                            {role.label}
                        </SelectItem>
                    ))}
                    
            </Select>
            <Button color='secondary' variant='shadow' className='w-24 text-white' onClick={(e) => handleFormSubmit(e)}>Login</Button>
        </form>
    </div>
  )
}
