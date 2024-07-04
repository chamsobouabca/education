import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import LogoutBtn from './LogoutBtn';


export default function Header() {
  return (
    <Navbar className='bg-gray-950 border-b-1 border-b-white p-0'>
      <NavbarBrand>
        <p className="font-bold text-xl text-primary-500">Saas-Education</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className='text-white hover:text-secondary-500' href="/main/admindashboared" >
            Admin Dashboared
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="/main/manageteachers" className='text-white hover:text-secondary-500' aria-current="page">
            Manage Teachers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white hover:text-secondary-500' href="/main/managestudents">
            Manage Students
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white hover:text-secondary-500' href="/main/managelevels">
            Manage Levels
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white hover:text-secondary-500' href="/main/tasks">
            Tasks
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LogoutBtn />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
