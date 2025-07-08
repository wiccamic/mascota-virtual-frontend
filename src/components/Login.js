import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post('https://tami-glossim.onrender.com/login', { username, password });

    // 💾 Guardar el token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('points', response.data.points);

    console.log('Token guardado:', response.data.token); // 👉 Verifica que el token no esté vacío.

    navigate('/game');
  } catch (err) {
    alert('Credenciales incorrectas.');
  }
};

  return (
  <div
  style={{
    backgroundImage: window.innerWidth <= 768
      ? 'url(https://i.imgur.com/vIuz34X.gif)' // fondo para móviles
      : 'url(https://i.imgur.com/01ybR1x.gif)', // fondo para escritorio
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }}
>
    <img src="https://i.imgur.com/BjB96EY.png" alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
    <h2 style={{ color: '#4B0082' }}>Iniciar Sesión</h2>

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
      onClick={handleLogin}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4B0082',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Iniciar Sesión
    </button>
  </div>
);
}

export default Login;
