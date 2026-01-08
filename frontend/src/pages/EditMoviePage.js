import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditMoviePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL'den ID'yi al (örn: /edit-movie/5)

  // Form State'leri
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);

  // Listeler
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Yönetmenleri ve Türleri Çek (Select kutuları için)
      const dirRes = await axios.get('http://localhost:3000/directors');
      setDirectors(dirRes.data);
      const genreRes = await axios.get('http://localhost:3000/genres');
      setGenres(genreRes.data);

      // 2. DÜZENLENECEK FİLMİN BİLGİLERİNİ ÇEK
      const movieRes = await axios.get(`http://localhost:3000/movies/${id}`);
      const movie = movieRes.data;

      // 3. Formu Eski Verilerle Doldur
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setPosterUrl(movie.posterUrl);
      
      if (movie.director) setDirectorId(movie.director.id);
      
      // Türleri ID listesine çevirip state'e atıyoruz
      if (movie.genres) {
        setSelectedGenreIds(movie.genres.map(g => g.id));
      }

    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/movies/${id}`, {
        title,
        description,
        releaseYear: parseInt(releaseYear),
        posterUrl,
        directorId: parseInt(directorId),
        genreIds: selectedGenreIds
      });
      alert('Film Başarıyla Güncellendi!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Güncelleme hatası oluştu!');
    }
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(parseInt(options[i].value));
    }
    setSelectedGenreIds(selected);
  };

  return (
    <div style={{ color: 'white', maxWidth:'600px', margin:'40px auto' }}>
      <h2>Filmi Düzenle</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group"><label>Film Adı:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group"><label>Açıklama:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="form-group"><label>Yıl:</label>
          <input type="number" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} required />
        </div>
        <div className="form-group"><label>Afiş URL:</label>
          <input type="text" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} required />
        </div>
        
        <div className="form-group"><label>Yönetmen:</label>
          <select value={directorId} onChange={e => setDirectorId(e.target.value)} style={{width:'100%', padding:'10px'}}>
            {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div className="form-group"><label>Türler (Ctrl ile çoklu seç):</label>
          <select multiple value={selectedGenreIds} onChange={handleGenreChange} style={{width:'100%', height:'100px'}}>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>

        <button type="submit" style={{marginTop:'20px', backgroundColor:'#2ecc71'}}>GÜNCELLE</button>
      </form>
    </div>
  );
}