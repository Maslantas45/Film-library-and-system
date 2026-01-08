import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Sayfa açılınca filmleri çek
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies');
      // Filmleri veritabanından geldiği gibi kaydet
      setMovies(response.data);
    } catch (error) {
      console.error('Filmler çekilemedi:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Bu filmi silmek istediğine emin misin?")) {
        try {
            await axios.delete(`http://localhost:3000/movies/${id}`);
            fetchMovies(); // Listeyi yenile
        } catch (error) {
            alert("Silinirken hata oluştu.");
        }
    }
  };

  // BANNER İÇİN FİLM SEÇME (Listenin başındaki filmi alalım)
  // Eğer hiç film yoksa null olsun
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  return (
    <div>
      {/* --- BURASI ARTIK OTOMATİK --- */}
      {/* Eğer veritabanında film varsa, ilkini Banner yap */}
      {featuredMovie ? (
        <div className="hero-wrapper">
          <img 
            src={featuredMovie.posterUrl} 
            alt={featuredMovie.title} 
            className="hero-image" 
          />
          <div className="hero-overlay">
            <div>
                <h1 className="hero-title">{featuredMovie.title}</h1>
                <p style={{color:'white', maxWidth:'600px', textShadow:'1px 1px 3px black'}}>
                    {featuredMovie.description}
                </p>
            </div>
          </div>
        </div>
      ) : (
        // Eğer hiç film yoksa bu boş kutu gözüksün
        <div className="hero-wrapper" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#333'}}>
            <h2 style={{color:'gray'}}>Henüz Film Eklenmedi</h2>
        </div>
      )}
      {/* ----------------------------- */}

      <h2 className="mb-4" style={{marginTop:'30px'}}>Vizyondaki Filmler</h2>
      
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="card-body">
              <h3>{movie.title} ({movie.releaseYear})</h3>
              <p>{movie.description}</p>
              <p><strong>Yönetmen:</strong> {movie.director ? movie.director.name : 'Bilinmiyor'}</p>
              
              <div style={{marginBottom: '10px'}}>
                {movie.genres && movie.genres.map(g => (
                  <span key={g.id} className="tag">{g.name}</span>
                ))}
              </div>

              {/* Sadece Admin ise Sil butonunu göster (Opsiyonel güvenlik) */}
              <button className="delete-btn" onClick={() => handleDelete(movie.id)}>Sil</button>
              <button 
    className="edit-btn" 
    style={{backgroundColor: '#f39c12', marginRight: '10px'}} // Turuncu renk
    onClick={() => navigate(`/edit-movie/${movie.id}`)}
>
    Düzenle
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}