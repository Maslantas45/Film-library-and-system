import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Director } from '../../directors/entities/director.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseYear: number;

  @Column()
  posterUrl: string;

  @ManyToOne(() => Director, (director) => director.movies, { onDelete: 'SET NULL' })
  director: Director;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable() // Ara tabloyu (pivot table) bu oluşturur
  genres: Genre[];
}