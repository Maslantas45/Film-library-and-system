import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Genre])], 
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}