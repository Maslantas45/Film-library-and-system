import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users', {
        email: email,
        password: password
      });
      alert('Kayıt Başarılı! Giriş yapabilirsin.');
      navigate('/login');
    } catch (error) {
      alert('Kayıt Başarısız!');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      
      {/* ARKA PLAN RESMİ */}
      <img 
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop" 
        alt="Background" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />

      {/* FİLTRE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: -1
      }}></div>

      {/* KAYIT FORMU */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        padding: '60px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        color: 'white'
      }}>
        <h2 style={{textAlign:'center', marginBottom: '30px', fontWeight:'bold'}}>Aramıza Katıl</h2>
        
        <form onSubmit={handleRegister}>
          <div className="form-group" style={{marginBottom: '20px'}}>
            <label>Email</label>
            <input 
              type="email" 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{background: '#333', border: 'none', color: 'white', height: '50px'}}
            />
          </div>
          
          <div className="form-group" style={{marginBottom: '30px'}}>
            <label>Şifre</label>
            <input 
              type="password" 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{background: '#333', border: 'none', color: 'white', height: '50px'}}
            />
          </div>
          
          <button type="submit" style={{height: '50px', fontSize: '18px', backgroundColor: '#e50914'}}>KAYIT OL</button>
        </form>
      </div>
    </div>
  );
}