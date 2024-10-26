import React, { useState, useEffect, useContext } from 'react'
import { logInWithGoogle, signUp, updateProfileUsername } from '../../services/supabase/Auth';
import { Link, useNavigate } from 'react-router-dom';
import BtnBlack from '../../shared/btnBlack';
import Input from '../../shared/Input';
import BtnImage from '../../shared/btnImage';
import { supabase } from '../../services/supabase';
import { ArrowUpRight, agrozamLogo, googleLogo } from '../../assets/content';
import { Toaster, toast } from 'sonner';
import AuthContext from '../../context/AutContext';



function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginGoogle = async (e) => {
    e.preventDefault()
    await logInWithGoogle()
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userFormData = {
      email: email,
      password: password
    }
    const result = await signUp(userFormData)
    const userObject = await supabase.auth.getUser()
    // console.log(result.user)

    if (result && result.user) {
      // const { data: { user } } = await supabase.auth.getUser()
      toast.success('Usuario Creado')
      const user = result.user
      const idUser = user.id

      const dataUser = {
        id: idUser,
        username: username
      }
      await updateProfileUsername(dataUser)

      if (user){
        navigate('/')
      }
      
    }



  }
  return (

    <section className='grid place-items-center h-screen  w-full ps-8 pe-8 max-w-md mx-auto relative min-h-[600px]'>

      <form onSubmit={handleSubmit} className="flex justify-center flex-col w-[100%] lg:w-[400px] gap-2">
        <Toaster position='top-right' expand visibleToasts={2} duration={1500} />
        <img className='w-32 h-32 mx-auto' src={agrozamLogo} alt="logo" />
        <h1 className="text-xl font-bold text-black text-center">Crea cuenta en Agrozam</h1>
        <Input label='Usuario' type='text' placeholder='Nombre de Usuario' onChange={e => setUsername(e.target.value)} />
        <Input label='Correo' type='text' placeholder='Correo Electrónico' onChange={e => setEmail(e.target.value)} />
        <Input label='Contraseña' type='password' placeholder='Ingresa tu contraseña' onChange={e => setPassword(e.target.value)} />

        <BtnBlack text={'Ingresar'} />

        <div className='flex mx-auto justify-center'>
          <p className='text-sm opacity-75 me-2'>Ya tienes cuenta? </p>
          <Link to='/login' className='font-bold hover:scale-110 hover:font-bold text-sm flex items-center '>
            Inicia Sesión
            <ArrowUpRight />
          </Link>
        </div>
        <div className=' mt-4 relative flex flex-col justify-center'>
          <div className='bg-black h-[1.5px] opacity-10 relative'>
          </div>
          <p className='bg-white w-[30px] mx-auto relative top-[-12px] text-center'>o</p>
        </div>
        <BtnImage logo={googleLogo} text='Continua con Google' onClick={loginGoogle} />

      </form>


    </section>

  )
}

export default Register

