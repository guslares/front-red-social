import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { PublicLayout } from '../layout/public/PublicLayout'
import { Login } from '../layout/user/Login'
import { Register } from '../layout/user/Register'
import { PrivateLayout } from '../layout/private/PrivateLayout'
import { Feed } from '../layout/publication/Feed'
import { AuthProvider } from '../context/AuthProvider'
import { Logout } from '../layout/user/Logout'
import { People } from '../layout/user/People'
import { Config } from '../layout/user/Config'


export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="registro" element={<Register />} />


                    </Route>
                    <Route path='/social' element={<PrivateLayout />}>
                        <Route index element={<Feed />} />
                        <Route path="feed" element={<Feed />} />
                        <Route path="gente" element={<People />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="ajustes" element={<Config />} />
                    </Route>

                    <Route path="*" element={
                        <><p>
                            <h1>Error 404</h1>
                            <Link to="/">Volver al inicio</Link>
                        </p>
                        </>
                    }

                    />

                </Routes>

            </AuthProvider>
        </BrowserRouter>
    )
}
