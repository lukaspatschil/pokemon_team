import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewUserInput } from './dto/new-user.input';
import { UserArgs } from './dto/user.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Query((returns) => [User])
  users(@Args() userArgs: UserArgs): Promise<User[]> {
    return this.userService.findAll(userArgs);
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const user = await this.userService.create(newUserData);
    pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  //! :(
  // @Mutation((returns) => User)
  // async removeUser(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }

  @Subscription((returns) => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
