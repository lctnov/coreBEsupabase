import { recruiterCastingService } from "../services/recruiterCasting.service";

export class RecruiterCastingController {

  //Tạo nội dung casting mới
  async createCasting(ctx: any, input: any) {
    return await recruiterCastingService.createCasting(ctx.user.id, input);
  }


}

export const recruiterCastingController = new RecruiterCastingController();
