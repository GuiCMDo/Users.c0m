import { useEffect, useState, useRef } from "react" //Reacts Hooks
import "./styleU.css"
import Trash from "../../assets/trash.svg"
import api from '../../services/api'

function User() {
  const [users, setUsers] = useState([])

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <header>
        <nav>
          <ul>
            <a href="../">HOME</a>
            <a href="../User">USERS</a>
            <a href="">CONTACT</a>
          </ul>
        </nav>
      </header>

      <div className="container">
      <h1>Lista de Usuários</h1>
      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}> {/*No React quando precisamos mandar um parâmetro na função utilizamos () => function(parametro)}, se não precisar enviar utilizamos assim function(parametero)}*/}
            <img src={Trash} />
          </button>
        </div>
      ))}
      </div>
    </>
  )
}

export default User