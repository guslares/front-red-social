import React, { useEffect, useState } from 'react'

import { Global } from '../helpers/Global'

import { UserList } from '../layout/user/UserList'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { GetProfile } from '../helpers/GetProfile'




export const Following = () => {
    const { auth } = useAuth()
    console.log(auth)

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile]= useState({})

    const params = useParams()



    useEffect(() => {
        getUsers(1)
        GetProfile(params.userId,setUserProfile)
    }, [])

    const getUsers = async (nextPage = 1) => {
        setLoading(true)

        // Sacar user id de la URL
        const userId = params.userId
        //petición para sacar usuarios
        const request = await fetch(Global.url + 'follow/following/' + userId + "/" + nextPage, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        })
        // crear un estado para listarlos
        const data = await request.json()
        //recoger y limpiar following 
        let cleanUsers = []

        data.results.docs.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.followed]
        })

        data.users = cleanUsers
       

        if (data.users && data.status == "success") {

            let newUsers = data.users

            if (users.length >= 1) {
                newUsers = [...users, ...newUsers]
            }

            setUsers(newUsers)
            setFollowing(data.user_following)

            setLoading(false)

            if (data.results.hasNextPage == false) {
                setMore(false)
            }

        }
    }

    // paginación   


    return (
        <>
            <section className="layout__content">

                <header className="content__header">
                    <h1 className="content__title">Usuarios que sigue {userProfile.name} {userProfile.surname} </h1>
                </header>

                <UserList users={users}
                    getUsers={getUsers}
                    following={following}
                    setFollowing={setFollowing}
                    more={more}
                    loading={loading}
                    page={page}
                    setPage={setPage} />
            </section>
        </>
    )
}
