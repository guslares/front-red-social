import React, { useEffect, useState } from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../hooks/useAuth'
import { GetProfile } from '../../helpers/GetProfile'
import { useParams, Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'


export const Profile = () => {

    const { auth } = useAuth()
    const [user, setUser] = useState({})
    const [counters, setCounters] = useState({})
    const params = useParams()
    const [iFollow, setIFollow] = useState(false)
    const [publications, setPublications] = useState([])

    useEffect(() => {
        getDataUser()
        getCounters()
        getPublications()
    }, [])

    useEffect(() => {
        getDataUser()
        getCounters()
        getPublications()
    
    }, [params])

    const getDataUser = async () => {

        let dataUser = await GetProfile(params.userId, setUser)
        if (dataUser.following && dataUser.following._id) setIFollow(true)
    }

    const getCounters = async () => {
       
        const request = await fetch(Global.url + "user/counters/" + params.userId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })

        const data = await request.json()


        if (data.userId) {
            setCounters(data)
      
        }



    }

    const unfollow = async (userId) => {
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

            setIFollow(false)
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
            setIFollow(true)
        }
        // Actualizar estado following, agregando el nuevo follow, filtrando los datos para eliminar el antiguo userId

    }

    const getPublications = async (page = 1) => {
      
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        const data = await request.json()
        if (data.status == "success") {
            setPublications(data.publications.docs)
        }
        

    }

    return (

        <>


            <header className="aside__profile-info">

                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}

                        {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                            {user._id != auth._id &&
                                (iFollow ?
                                    <button className="content__button content__button--rigth" onClick={() => { unfollow(user._id) }}>Dejar de seguir</button>
                                    :
                                    <button className="content__button content__button--rigth" onClick={() => { follow(user._id) }}>Seguir</button>
                                )}

                        </div>
                        <h2 className="container-names__nickname">{user.nick}</h2>
                        <p>{user.bio}</p>

                    </div>

                </div>

                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={'/social/siguiendo/' + user._id} className="following__link">
                            <span className="following__title">Siguiendo</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={'/social/seguidores/' + user._id} className="following__link">
                            <span className="following__title">Seguidores</span>
                            <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={'/social/perfil/' + user._id} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>


                </div>
            </header>


            <div className="content__posts">
                {publications.map(publication => {
                    return (

                        <article key={publication._id} className="posts__post">

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={'/social/perfil/' + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil" />}

                                        {publication.user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{publication.user.name} {publication.user.surname}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">{publication.created_at}</a>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <a href="#" className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </a>

                                </div>
                            }
                        </article>
                    )
                })}

            </div>

            <div className="content__container-btn">
                <button className="content__btn-more-post">
                    Ver mas publicaciones
                </button>
            </div>


        </>
    )

}
