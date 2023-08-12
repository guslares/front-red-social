
import React, { useEffect, useState } from 'react'
import avatar from '../../../assets/img/user.png'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'


export const UserList = ({ users, setUsers, following, setFollowing,loading,more,page,getUsers,setPage }) => {

    const { auth } = useAuth()
    const ufollow = async (userId) => {
        // Petición para guardar el unfollow
        const request = await fetch(Global.url + 'follow/unfollow/' + userId,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem('token')
                }
            }
        )
        // Cuando esté todo correcto
        const data = await request.json()

        if (data.status == 'success') {

            let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
            setFollowing(filterFollowings)
        }
        // Actualizar estado following, agregando el quiar el follow

    }


    const follow = async (userId) => {
        // Petición para guardar el follow




        const request = await fetch(Global.url + 'follow/save',
            {

                method: "POST",
                body: JSON.stringify({ followed: userId }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',

                    'Authorization': localStorage.getItem('token')
                }
            })
        console.log(JSON.stringify({ followed: userId }))

        const data = await request.json()

        // Cuando esté todo correcto
        if (data.status == 'success') {
            setFollowing([...following, userId])
        }
        // Actualizar estado following, agregando el nuevo follow, filtrando los datos para eliminar el antiguo userId

    }

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getUsers(next)
    
      }
    return (
        <>
            <div className="content__posts">
                {loading ? <div>Cargando...</div> : ""}
                {
                    users.map(user => {

                        return (
                            <article className="posts__post" key={user._id}>

                                <div className="post__container">

                                    <div className="post__image-user">
                                        <a href="#" className="post__image-link">
                                            {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}

                                            {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                        </a>
                                    </div>

                                    <div className="post__body">

                                        <div className="post__user-info">
                                            <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                                            <span className="user-info__divider"> | </span>
                                            <a href="#" className="user-info__create-date">{user.created_at}</a>
                                        </div>

                                        <h4 className="post__content">{user.bio} {user._id}</h4>

                                    </div>

                                </div>

                                {user._id != auth._id &&
                                    <div className="post__buttons">

                                        {!following.includes(user._id) &&
                                            <button className="post__button post__button--green"
                                                onClick={() => follow(user._id)}>
                                                Seguir
                                            </button>
                                        }

                                        {following.includes(user._id) &&
                                            <button className="post__button"
                                                onClick={() => ufollow(user._id)}>
                                                Dejar de seguir
                                            </button>
                                        }
                                    </div>
                                }
                            </article>
                        )
                    })
                }
            </div>
            {loading ? <div>Cargando...</div> : ""}

            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }

        </>
    )
}
