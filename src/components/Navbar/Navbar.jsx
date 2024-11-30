import React from 'react'
import { NavbarMenu } from '../../mockData/data'
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {
    const [open,setOpen]= React.useState(false);
  return <>
    <nav>
        <div className="container flex justify-between items-center py-8">
            {/* Logo section */}
            <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
                <p>Mon</p>
                  <p className='text-secondary'>immobilier sur</p>
            </div>
            {/* Menu section */}
            <div className='hidden md:block'>
                <ul className='flex items-center gap-6 text-gray-600'>
                    {
                        NavbarMenu.map((item)=>{
                            return <li key={item.id}>
                                <a className='inline-block py-1 px-3 hover:text-primary font-semibold' href={item.link}>
                                    {item.title}
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* Mobile Menu Section */}
            <div className='md:hidden' onClick={()=>setOpen(!open)}>
                <MdMenu className='text-4xl'/>
            </div>
        </div>
    </nav> 
    {/* Mobile SideBar Section */}
    <ResponsiveMenu open={open}/>

  </>;
}

export default Navbar