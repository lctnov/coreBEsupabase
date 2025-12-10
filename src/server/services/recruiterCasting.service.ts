import * as RecruiterRepo from "../repositories/recruiterCasting.repository";
import { uploadToS3 } from "../utils/s3-aws";

class RecruiterCastingService {
  async createCasting(userId: string, data: any) {
    // 1. Kiểm tra duplicate
    const duplicate = await RecruiterRepo.findDuplicateCasting(userId, data);
    if (duplicate) {
      throw new Error("Bị trùng casting trước đó !!!");
    }

    // 2. Upload poster S3
    const upload = await uploadToS3(data.posterFile, `recruiter/${userId}`);

    // 3. Tạo recruiterCastings
    const casting = await RecruiterRepo.createCasting(userId, data);

    // 4. Tạo castingDetails
    await RecruiterRepo.insertCastingDetail(casting.id, {
      movieTitle: data.movieTitle,
      description: data.description,
      posterKey: upload.key,
      posterMime: upload.mime,
      posterSize: upload.size,
    });

    return {
      success: true,
      castingId: casting.id,
      posterUrl: upload.url,
    };
  }
}

export const recruiterCastingService = new RecruiterCastingService();
