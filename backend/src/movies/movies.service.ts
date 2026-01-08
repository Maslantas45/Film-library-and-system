import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    // 1. ADIM: Yönetmeni bul
    const directorId = +createMovieDto.directorId;
    const director = await this.directorRepository.findOneBy({ id: directorId });
    
    if (!director) {
      throw new NotFoundException(`Veritabanında ID'si ${directorId} olan bir yönetmen bulunamadı!`);
    }

    // 2. ADIM: Türleri bul
    // --- İŞTE O HATAYI ÇÖZEN KISIM BURASI ---
    // Bilgisayara bu listenin içinde "Genre" olacağını söylüyoruz
    let genres: Genre[] = []; 
    // ----------------------------------------

    if (createMovieDto.genreIds && createMovieDto.genreIds.length > 0) {
      const genreIds = createMovieDto.genreIds.map(id => +id);
      genres = await this.genreRepository.findBy({
        id: In(genreIds),
      });
    }

    // 3. ADIM: Filmi oluştur
    const movie = this.movieRepository.create({
      title: createMovieDto.title,
      description: createMovieDto.description,
      releaseYear: +createMovieDto.releaseYear,
      posterUrl: createMovieDto.posterUrl,
      director: director, 
      genres: genres,     
    });

    console.log('✅ Film Başarıyla Oluşturuldu:', movie.title);
    return await this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find({
      relations: ['director', 'genres'],
    });
  }

  findOne(id: number) {
    return this.movieRepository.findOne({
      where: { id },
      relations: ['director', 'genres'],
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}