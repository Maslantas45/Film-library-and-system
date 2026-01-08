import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: email,
        password: password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Giriş Başarılı!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      alert('Giriş Başarısız! Bilgilerini kontrol et.');
    }
  };

  return (
    <div style={{
      position: 'fixed', /* Sayfayı kilitler */
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center', /* Dikey ortalama */
      justifyContent: 'center', /* Yatay ortalama */
      zIndex: 50 /* Menünün bile üstüne çıkabilir */
    }}>
      
      {/* 1. ARKA PLAN RESMİ (Sağlam Link) */}
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
          zIndex: -1 /* En arkada dursun */
        }}
      />

      {/* 2. KARANLIK FİLTRE (Yazılar okunsun diye) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', /* %60 Siyahlık */
        zIndex: -1
      }}></div>

      {/* 3. GİRİŞ FORMU */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)', /* Hafif saydam siyah kutu */
        padding: '60px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        color: 'white'
      }}>
        <h2 style={{textAlign:'center', marginBottom: '30px', fontWeight:'bold'}}>Tekrar Hoşgeldin</h2>
        
        <form onSubmit={handleLogin}>
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
          
          <button type="submit" style={{height: '50px', fontSize: '18px'}}>GİRİŞ YAP</button>
        </form>
      </div>
    </div>
  );
}