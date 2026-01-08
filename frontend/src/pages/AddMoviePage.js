import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddMoviePage() {
  const navigate = useNavigate();
  
  // State'ler
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  
  // Yönetmen ve Tür Listeleri
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Seçilenler
  const [directorId, setDirectorId] = useState(''); // Başlangıçta boş
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);

  // Sayfa Açılınca Verileri Çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Yönetmenleri Çek
        const dirRes = await axios.get('http://localhost:3000/directors');
        setDirectors(dirRes.data);
        
        // --- İŞTE ÇÖZÜM BURASI ---
        // Eğer yönetmen listesi boş değilse, İLK yönetmeni otomatik seç!
        if (dirRes.data.length > 0) {
            setDirectorId(dirRes.data[0].id);
        }

        // 2. Türleri Çek
        const genreRes = await axios.get('http://localhost:3000/genres');
        setGenres(genreRes.data);

      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hata ayıklama için konsola yazdıralım (F12'de görebilirsin)
    console.log("Gönderilecek Yönetmen ID:", directorId);

    if (!directorId) {
        alert("Hata: Yönetmen ID'si boş görünüyor!");
        return;
    }

    try {
      await axios.post('http://localhost:3000/movies', {
        title,
        description,
        releaseYear: parseInt(releaseYear),
        posterUrl,
        directorId: parseInt(directorId), // Sayıya çevirip gönderelim
        genreIds: selectedGenreIds
      });
      
      alert('Film Başarıyla Eklendi!');
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert('Film eklenirken hata oluştu! Konsola bak.');
    }
  };

  // Tür seçimi için (Çoklu seçim)
  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setSelectedGenreIds(selected);
  };

  return (
    <div className="add-movie-page" style={{ color: 'white', maxWidth:'600px', margin:'0 auto' }}>
      <h2>Yeni Film Ekle</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Film Adı:</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Açıklama:</label>
          <textarea onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Yıl:</label>
          <input type="number" onChange={(e) => setReleaseYear(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Afiş URL (Resim Linki):</label>
          <input type="text" onChange={(e) => setPosterUrl(e.target.value)} required />
        </div>

        {/* YÖNETMEN SEÇİMİ */}
        <div className="form-group">
          <label>Yönetmen Seç:</label>
          <select 
            value={directorId} // Kutu, state'teki değeri göstersin
            onChange={(e) => setDirectorId(e.target.value)}
            style={{width:'100%', padding:'10px', background:'#333', color:'white', border:'1px solid #555'}}
          >
            {directors.map((dir) => (
              <option key={dir.id} value={dir.id}>
                {dir.name}
              </option>
            ))}
          </select>
        </div>

        {/* TÜR SEÇİMİ */}
        <div className="form-group">
          <label>Tür Seç (Ctrl tuşuyla birden fazla seçebilirsin):</label>
          <select 
            multiple 
            onChange={handleGenreChange} 
            style={{width:'100%', height:'100px', background:'#333', color:'white', border:'1px solid #555'}}
          >
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{marginTop:'20px'}}>KAYDET</button>
      </form>
    </div>
  );
}