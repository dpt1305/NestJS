import { UserDto } from './dto/user.dto';
// import { Repository } from 'typeorm';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto) {
    const { username, password } = userDto;

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    // bcrypt.compare(
    //   'Tung_1239',
    //   '$2b$10$NiLASRL5RE.K/l9z5hjHXuWapv94TDDd82Szkp.ij.pT5oqrZ6fJ.',
    //   (error, result) => {
    //     console.log(result);
    //   },
    // );
    const user = this.create({ username, password: hash });
    await this.save(user);
    return user;
  }
}
