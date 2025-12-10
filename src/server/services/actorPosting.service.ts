import * as actorPostingRepo from "../repositories/actorPosting.repository";
import { uploadToS3 } from "../utils/s3-aws";

class ActorPostingService {
	
	async saveProfile(userId: number, profileData: any) {
		// 1. Kiểm tra trùng profile
		const duplicate = await actorPostingRepo.findDuplicateProfile(userId, profileData);
		if (duplicate) throw new Error("Bạn đã tạo một profile trước đó!");

		// 2. Kiểm tra actor có profile chưa
		let profile = await actorPostingRepo.findByUserId(userId);

		if (!profile) {
			profile = await actorPostingRepo.createProfile(userId, profileData);
		} else {
			await actorPostingRepo.updateProfile(profile.id, userId, profileData);
		}

		// 3. Upload images
		if (profileData.images?.length > 0) {
			for (const file of profileData.images) {
			const uploaded = await uploadToS3(file, `actor/${userId}`);
			await actorPostingRepo.insertImage({
				actorProfileId: profile.id,
				s3Key: uploaded.key,
				bucket: process.env.AWS_BUCKET!,
				region: process.env.AWS_REGION!,
			});
			}
		}

		return { success: true, profileId: profile.id };
	}

	async getProfile(userId: number) {
		return actorPostingRepo.getProfileWithImages(userId);
	}
}

export const actorPostingService = new ActorPostingService();
