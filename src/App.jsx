import { useState } from "react";
import baseColaboradores from "./colaboradores";
import "./App.css"


const Colaborador = ({ colaborador }) => {
  return (
    <div>
      <h3>{colaborador.nombre}</h3>
      <p>{colaborador.correo}</p>
    </div>
  );
};

const AgregarColaborador = ({ onAgregarColaborador }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarColaborador({ nombre, correo });
    setNombre("");
    setCorreo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <button type="submit">Agregar colaborador</button>
    </form>
  );
};

const App = () => {
  const [colaboradores, setColaboradores] = useState(baseColaboradores);

  const handleAgregarColaborador = (nuevoColaborador) => {
    setColaboradores([
      ...colaboradores,
      {
        id: colaboradores.length + 1,
        ...nuevoColaborador,
      },
    ]);
  };

  const handleBuscar = (e) => {
    const query = e.target.value.toLowerCase();
    const nuevosColaboradores = baseColaboradores.filter((colaborador) =>
      colaborador.nombre.toLowerCase().includes(query)
    );
    setColaboradores(nuevosColaboradores);
  };

  return (
    <div>
      <h1>Lista de colaboradores</h1>
      <input type="text" placeholder="Buscar por nombre" onChange={handleBuscar} />
      {colaboradores.map((colaborador) => (
        <Colaborador key={colaborador.id} colaborador={colaborador} />
      ))}
      <AgregarColaborador onAgregarColaborador={handleAgregarColaborador} />
    </div>
  );
};

export default App;