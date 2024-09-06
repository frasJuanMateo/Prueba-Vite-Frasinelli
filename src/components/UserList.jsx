import { useState, useEffect } from 'react'
import axios from "axios"

function UserList({ baseUrl }) {
  const [data, setData] = useState([])
  const [post, setPost] = useState({ name: "", email: "" })
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    if (event.target.name == "search") {
      setSearch(event.target.value);
    }
    else {
      const { name, value } = event.target;
      setPost({
        ...post,
        [name]: value
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(baseUrl, post);
    setPost({ name: "", email: "" });
  };
  const handleEdit = (event) => {
    const name = window.prompt("Nuevo nombre:")
    const email = window.prompt("Nuevo email:")
    axios.put(`${baseUrl}/${event.target.value}`, { name: name, email: email });
  };
  const handleDelete = (event) => {
    axios.delete(`${baseUrl}/${event.target.value}`);
  };

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => setData(res.data))
      .catch(error => console.error(error));
  },)

  return (
    <>
      <label>
        Buscar:
        <input type="text" name="search" onChange={(handleChange)} />
      </label>

      <table>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
        {data.filter(post => search == "" || post.name.toLowerCase().startsWith(search.toLowerCase()) || post.email.toLowerCase().startsWith(search.toLowerCase())).map(post => <tr>
          <th>{post.name}</th>
          <th>{post.email}</th>
          <button value={post.id} onClick={handleDelete}>Eliminar</button>
          <button value={post.id} onClick={handleEdit}>Editar</button>
        </tr>)}
      </table>

      <form onSubmit={handleSubmit}>
        <h1>Formulario</h1>
        <label>
          Nombre:
          <input type="text" name="name" onChange={handleChange} value={post.name} />
        </label>
        <label>
          Email:
          <input type="text" name="email" onChange={handleChange} value={post.email} />
        </label>
        <button type="submit">Subir</button>
      </form>
    </>
  )
}

export default UserList
