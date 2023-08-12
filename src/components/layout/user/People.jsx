import React, { useEffect, useState } from 'react'

import { Global } from '../../helpers/Global'

import { UserList } from './UserList'

export const People = () => {


  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    getUsers(1)
  }, [])

  const getUsers = async (nextPage = 1) => {
    setLoading(true)



    //petición para sacar usuarios
    const request = await fetch(Global.url + 'user/list/' + nextPage, {
      method: 'Get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
    // crear un estado para listarlos
    const data = await request.json()

    if (data.users && data.status == "success") {

      let newUsers = data.users.docs

      if (users.length >= 1) {
        newUsers = [...users, ...data.users.docs]
      }

      setUsers(newUsers)
      setFollowing(data.user_following)

      setLoading(false)

      if (data.users.hasNextPage == false) {
        setMore(false)
      }

    }
  }
  // paginación   


  return (
    <>
      <section className="layout__content">

        <header className="content__header">
          <h1 className="content__title">Gente</h1>
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
