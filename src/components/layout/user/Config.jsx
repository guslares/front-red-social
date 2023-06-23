import React, { useState } from 'react'

export const Config = () => {
    
    const [saved, setSaved] = useState("not-saved")
    const updateUser = (e)=>{
        e.preventDefault()

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
                        <input type="text" name="name"  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='surname'>Apellido</label>
                        <input type="text" name="surname"  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='nick'>Nickname</label>
                        <input type="text" name="nick"  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input type="email" name="email"  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type="password" name="password"  />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='file0'>Avatar</label>
                        <div className='avatar'>
                            {/* MOSTRAR IMAGEN */}
                        </div>
                        <input type='file' name='file0' id='file'/>
                    </div>
                    <input type="submit" value="Registrate" className='btn btn-success' />
                </form>
            </div>
        </>
    )
}