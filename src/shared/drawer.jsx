import React, { useContext } from 'react'
import Flex from '../components/Flex'
import { CloseIcon } from '../assets/content'
import { Link } from 'react-router-dom'
import DrawerContext from '../context/DrawerContext'

function Drawer() {
  const {open, toggleDrawer} = useContext(DrawerContext)


  return (
    <div className={`w-[300px] lg:hidden fixed h-screen  top-0 z-30  bg-white bg-opacity-90 ${open ? 'left-0': 'left-[-100%]'}`}>
      <div className='flex justify-end pe-4 mt-2 '>
        <CloseIcon onClick={toggleDrawer(false)} className='bg-black text-white rounded-md z-20' size={35} />
      </div>
      <Flex className='flex w-full ps-4'>
        <ul className="menu w-full pe-6 [&_li>*]:rounded-none">
          <li>
            <Link to='/' className='font-bold text-lg'>Inicio</Link>
          </li>
          <li>
            <Link to='/shop' className='font-bold text-lg'>Tienda</Link>
          </li>
          <li>
            <Link to='/contact' className='font-bold text-lg'>Contactanos</Link>
          </li>
          <li>
            <Link to='/product_detail' className='font-bold text-lg'>D Product</Link>
          </li>
        </ul>
      </Flex>
    </div>
  )
}

export default Drawer