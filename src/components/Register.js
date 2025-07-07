import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://tami-glossim.onrender.com/register', { username, password });
      alert(response.data.message);
      navigate('/');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert('Error de conexión con el servidor.');
      }
    }
  };

  return (
    <div style={{
      padding: 20,
      minHeight: '100vh',
      backgroundColor: '#FFFDD0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2 style={{ color: '#4B0082' }}>Registrarse</h2>

      <input
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: '1px solid #4B0082',
          width: '200px'
        }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: '1px solid #4B0082',
          width: '200px'
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4B0082',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Registrarse
      </button>
    </div>
  );
}

export default Register;
