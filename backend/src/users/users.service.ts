import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Bu dosya zaten var
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Kullanıcı Oluşturma (Kayıt Ol)
  create(createUserDto: CreateUserDto) {
    // Burada normalde şifreyi şifrelememiz (hash) lazım ama ödev için düz kaydediyoruz
    return this.usersRepository.save(createUserDto);
  }

  // Tüm Kullanıcıları Getir
  findAll() {
    return this.usersRepository.find();
  }

  // ID'ye göre bul
  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  // Email'e göre bul (Giriş yaparken lazım olacak)
  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}