import React, { createContext, useState, useEffect } from 'react'
import { Global } from '../helpers/Global'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    // const [compartido, setCompartido] = useState("Compartida en todos los componentes")

    const [auth, setAuth] = useState({})
    const [counters,setCounters] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        authUser()
        
    }, [])

    const authUser = async () => {
        // Sacar datos del usuario identificado del localstrage
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        // Comprobar si tengo el token y el user
        if (!token || !user) {
            setLoading(false)
            return false;
        }

        // Transformar los datos del usuario
        const userObj = JSON.parse(user)
        const userId = userObj.id;


        // Peticion ajax al backend que compruebe el token y que me devuevla todos los datos del usuario

        const requestProfile = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "applicction/json",
                "Authorization": token
            }
        })
       
        const dataProfile = await requestProfile.json()

    
        // Petición para los contadores
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "applicction/json",
                "Authorization": token
            }
        })
       
        const dataCounters = await requestCounters.json()
        // Setear el estado auth
        setAuth(dataProfile.user)
        setCounters(dataCounters)
        setLoading(false)
    
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                authUser,
                counters,
                setCounters,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
