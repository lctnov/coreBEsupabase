import { userRepository } from "../repositories/user.repository";

class UserService {

  // fetch paginated list of users
  async getUserList({ page, limit }: { page: number; limit: number }) {
    const offset = (page - 1) * limit;

    const data = await userRepository.getUsers(offset, limit);
    const total = await userRepository.countUsers();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }


  
}

export const userService = new UserService();
