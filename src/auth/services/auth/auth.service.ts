import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { getUsersQueryDTO } from 'src/auth/dtos/getUsers.query.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { User } from 'src/auth/schemas/user.schema';
import { IUser } from 'src/auth/types/users.types';
import { HashingService } from 'src/common/services/hashing/hashing.service';

export interface user {
  userID: string | Types.ObjectId;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersModel: Model<User>,
    private jwtService: JwtService,
    private passwordHashingService: HashingService,
  ) {}

  async getUsers(queryParams: getUsersQueryDTO) {
    const filters: FilterQuery<IUser> = {};

    if (queryParams.id) {
      filters._id = queryParams.id; // Match with _id field
    }
    return await this.usersModel.find(filters);
  }

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

  async signIn(data: LoginDto) {
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
    return { user: user, token };
  }
}
