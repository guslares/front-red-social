import React, { useEffect, useState } from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../hooks/useAuth'

import { useParams, Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { PublicationList } from '../publication/PublicationList'

export const Feed = () => {

    const { auth } = useAuth()
    const params = useParams()
    const [publications, setPublications] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)

    useEffect(() => {

        getPublications(1, false)
    }, [])

    const getPublications = async (page = 1, showNews = false) => {


        if (showNews) {

            setPublications([])
            setPage(1)
            page(1)

        }

        const request = await fetch(Global.url + "publication/feed/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        const data = await request.json()
        if (data.status == "success") {

            let newPublications = data.publications.docs

            if (!showNews && publications.length > 1) {

                newPublications = [...publications, ...data.publications.docs]
            }



            setPublications(newPublications)


            if (data.publications.hasNextPage == false) {
                setMore(false)
            }
            if (data.publications.totalPages == 1) {
                setMore(false)
            }
        }
    }


    return (
        <>

            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
            </header>
            <PublicationList
                getPublications={getPublications}
                publications={publications}
                setPublications={setPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />


        </>
    )
}
