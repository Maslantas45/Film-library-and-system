import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Bunu ekle
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // Bunu ekle

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Burayı kesin ekle!
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Auth işlemleri için lazım olacak
})
export class UsersModule {}