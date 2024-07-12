import { useEffect , useState, useRef} from "react" //Reacts Hooks
import "./style.css"
import Trash from "../../assets/trash.svg"
import api from '../../services/api'

// react hook - useRef

function Home() {
const [users, setUsers] = useState([]) //users é onde estão os dados || setUsers é o responsável por colocar os dados la dentro

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }


  //useEffect serve para ser executado toda vez que minha página abrir
  useEffect(() => {
    getUsers()
  }, [])
  //Toda vez que queremos pegar uma variável que seja atualizada toda vez na tela, o React não permite por questão de desempenho. Só é possível alterar os Estados do React
  // Tudo o que está acima do return é JavaScript, o que está dentro é HTML. Para que dentro do return tenha código javascript é necessário utilizar o {}. No React pode-se usar html dentro do JavaScript. No React é necessário dar uma chave para a div principal, no ex usamos o ID. O map serve para percorrer o array
  
  //HTML
  return (

    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="name" type="text" ref={inputName}/>
        <input placeholder="Idade" name="age" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

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
  )
}

export default Home
