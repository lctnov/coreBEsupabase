import { userService } from "../services/user.service";

export class UserController {

  // Lấy thông tin user hiện tại
  async getCurrentUser(input) {
	return await userService.getUserList(input);
  }



}

export const userController = new UserController();