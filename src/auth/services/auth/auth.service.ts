import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { User } from 'src/auth/schemas/user.schema';
import { HashingService } from 'src/common/services/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
    private jwtService: JwtService,
    private passwordHashingService: HashingService,
  ) {}

  async signUp(data: SignUpDto): Promise<{ user: SignUpDto }> {
    const { name, email, contact, password } = data;

    // Check if the email is already in use
    const existingUser = await this.usersModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password
    const hashedPassword =
      await this.passwordHashingService.hashPassword(password);

    // Create a new user
    const newUser = new this.usersModel({
      name,
      email,
      contact,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();
    return { user };
  }

  async signIn(data: LoginDto): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await this.usersModel.findOne({ email });

    //Compare Password
    if (
      !user ||
      !(await this.passwordHashingService.comparePassword(
        password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return { token };
  }
}
