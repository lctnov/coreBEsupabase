import { actorPostingService } from "../services/actorPosting.service";
export class ActorPostingController	{

	// Lưu profile diễn viên
	async saveProfile(ctx: any, input: any) {
		return await actorPostingService.saveProfile(ctx.user.id, input);
	}

	// Lấy profile diễn viên
	async getProfile(ctx: any) {
		return await actorPostingService.getProfile(ctx.user.id);
	}
}

export const actorPostingController = new ActorPostingController();