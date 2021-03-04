import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { UserArgs } from './dto/user.args';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        creationDate: new Date(),
      },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(userArgs: UserArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      ...userArgs,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
