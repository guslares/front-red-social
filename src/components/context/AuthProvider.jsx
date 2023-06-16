import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [compartido, setCompartido] = useState("Compartida en todos los componentes")

    return (
        <AuthContext.Provider
            value={{
                compartido
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
