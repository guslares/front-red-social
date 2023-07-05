import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import avatar from '../../../assets/img/user.png'

export const Config = () => {

    const { auth } = useAuth()
    const [saved, setSaved] = useState("not-saved")
    const updateUser = (e) => {
        e.preventDefault()
        console.log(auth.image)

    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header>


            <div className="content__posts">
                {saved == "saved" ? <strong className='alert alert-success'>"Usuario registrado correctamente"</strong> : ""}
                {saved == "error" ? <strong className='alert alert-danger'> "Usuario no se ha registrado"</strong> : ""}

                <form className='config-form' onSubmit={updateUser}>
                    <div className='form-group'>
                        <label htmlFor='name'>Nombre</label>
                        <input type="text" name="name" defaultValue={auth.name}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='surname'>Apellido</label>
                        <input type="text" name="surname" defaultValue={auth.surname}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='nick'>Nickname</label>
                        <input type="text" name="nick" defaultValue={auth.nick}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bio'>Bio</label>
                        <textarea name="bio" defaultValue={auth.bio}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input type="email" name="email" defaultValue={auth.email} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type="password" name="password" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='file0'>Avatar</label>
                        <div className='avatar'>
                            {/* MOSTRAR IMAGEN */}
                            {auth.image != "default.png" && <img src={Global.url+"user/avatar"+auth.image} className="container-avatar__img" alt="Foto de perfil"/>}
                            {auth.image = "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>}
                        </div>
                        <input type='file' name='file0' id='file' />
                    </div>

                    <input type="submit" value="Registrate" className='btn btn-success' />
                </form>
            </div>
        </>
    )
}
