import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DirectorsModule } from './directors/directors.module';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',            // Artık mysql kullanıyoruz
      host: 'localhost',        // Kendi bilgisayarın
      port: 3306,               // Standart MySQL portu
      username: 'root',         // Genelde 'root' olur
      password: '1234',             // Şifren varsa buraya yaz (XAMPP'te boştur)
      database: 'movie_db',     // Bağlanacağımız veritabanı adı
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,        // Tabloları otomatik oluşturur
    }),
    UsersModule,
    DirectorsModule,
    GenresModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}