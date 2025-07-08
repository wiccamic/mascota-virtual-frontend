import React, { useState } from 'react';

function Game() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [points, setPoints] = useState(parseInt(localStorage.getItem('points')) || 0);
  const [code, setCode] = useState('');
  const [petImage, setPetImage] = useState('https://i.imgur.com/iUrheeQ.gif'); // GIF normal
  const isMobile = window.innerWidth <= 600; // Detectar si es un dispositivo móvil

const feedPet = async () => {
  const token = localStorage.getItem('token');
  console.log('Token que se está enviando:', token); // ✅ Verifica que el token no esté vacío

  try {
    const response = await fetch('https://tami-glossim.onrender.com/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Token enviado
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      setPoints(data.points);
      localStorage.setItem('points', data.points);

      // Cambiar al GIF de alimentación
      setPetImage('https://i.imgur.com/daBySs4.gif');

      // Volver al GIF normal después de 2 segundos
      setTimeout(() => {
        setPetImage('https://i.imgur.com/iUrheeQ.gif');
      }, 5000);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error('Error en la solicitud fetch:', err);
    alert('Error al alimentar la mascota.');
  }
};

  return (
    <div style={{
  backgroundImage: isMobile 
  ? 'url(https://i.imgur.com/FnkTSlS.gif)' 
  : 'url(https://i.imgur.com/eTlyaEx.gif)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
}}>
      <img src="https://i.imgur.com/BjB96EY.png" alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h2>Tu mascota</h2>
      <img src={petImage} alt="Mascota Virtual" style={{ width: '300px', marginBottom: '20px' }} />
      <h3>Puntos: {points}</h3>
      <input
        type="text"
        placeholder="Ingresa código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: '10px', margin: '10px', borderRadius: '5px', border: '1px solid #4B0082' }}
      />
      <br />
      <button
        onClick={feedPet}
        style={{ padding: '10px 20px', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Alimentar Mascota
      </button>
    </div>
  );
}

export default Game;
