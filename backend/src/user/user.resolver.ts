import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewUserInput } from './dto/new-user.input';
import { UserArgs } from './dto/user.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Query(() => [User])
  users(@Args() userArgs: UserArgs): Promise<User[]> {
    return this.userService.findAll(userArgs);
  }

  @Mutation(() => User)
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

  @Subscription(() => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}
