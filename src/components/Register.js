import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Si el ancho es menor o igual a 768px = móvil
    };
    handleResize(); // Ejecuta al inicio
    window.addEventListener('resize', handleResize); // Escucha cambios
    return () => window.removeEventListener('resize', handleResize); // Limpieza
  }, []);

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
  backgroundImage: isMobile
    ? 'url(https://i.imgur.com/48JxuQ0.gif)' // fondo para celular
    : 'url(https://i.imgur.com/01ybR1x.gif)', // fondo para escritorio
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
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
