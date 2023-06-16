import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'

export const Login = () => {


  const { form, changed } = useForm({})
  const [saved, setSaved] = useState("not_sended")

  const loginUser = async (e) => {
    e.preventDefault()
    // Datos del formulario
    let userToLogin = form

    // Petición al backend

    const request = await fetch(Global.url + 'user/login', {
      method: 'POST',
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json()

    // Persistir los datos en el navegador


    if (data.status == "success") {
      setSaved("login")
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
    } else {
      setSaved("error")
    }

    console.log(data)
  }

  return (
    <>
      <header className="content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">
        {saved == "login" ? <strong className='alert alert-success'>"Usuario identificado"</strong> : ""}
        {saved == "error" ? <strong className='alert alert-danger'> "Usuario no se ha identificar"</strong> : ""}

        <form className="form_login" onSubmit={loginUser}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={changed} />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name='password' onChange={changed} />
          </div>

          <input type="submit" value="Login" className='btn btn-success' />
        </form>

      </div>
    </>
  )
}
