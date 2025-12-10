import { DbsCasting } from "../database";
import { actorProfiles, actorImages } from "../database/schema";
import { eq, and, isNull } from "drizzle-orm";

export function findDuplicateProfile(userId: any, input: any) {
  return DbsCasting.query.actorProfiles.findFirst({
    where: (item) => {
      let dobCondition;

      if (!input.dob) {
        dobCondition = isNull(item.dob);
      } else {
        const dob = new Date(input.dob);
        dobCondition = isNaN(dob.getTime())
          ? isNull(item.dob)
          : eq(item.dob, dob);
      }

      return and(
        eq(item.userId, userId),
        eq(item.fullName, input.fullName),
        dobCondition,
        eq(item.applyRole, input.applyRole ?? "")
      );
    },
  });
}

export function findByUserId(userId: any) {
  return DbsCasting.query.actorProfiles.findFirst({
    where: (item) => eq(item.userId, userId),
  });
}

export async function createProfile(userId: any, input: any) {
  return (
    await DbsCasting.insert(actorProfiles)
      .values({
        userId,
        fullName: input.fullName,
        dob: input.dob ? new Date(input.dob) : undefined,
        gender: input.gender,
        phone: input.phone,
        email: input.email,
        address: input.address,
        height: input.height,
        job: input.job,
        applyRole: input.applyRole,
        note: input.note,
      })
      .returning()
  )[0];
}

export function updateProfile(id: any, userId: any, input: any) {
  return DbsCasting.update(actorProfiles)
    .set({
      userId,
      fullName: input.fullName,
      dob: input.dob ? new Date(input.dob) : undefined,
      gender: input.gender,
      phone: input.phone,
      email: input.email,
      address: input.address,
      height: input.height,
      job: input.job,
      applyRole: input.applyRole,
      note: input.note,
      updatedAt: new Date(),
    })
    .where(eq(actorProfiles.id, id));
}

export function insertImage(imageData: {
  actorProfileId: any;
  s3Key: string;
  bucket: string;
  region: string;
}) {
  return DbsCasting.insert(actorImages).values({
    ...imageData,
    isAvatar: false,
  });
}

export function getProfileWithImages(userId: any) {
  return DbsCasting.query.actorProfiles.findFirst({
    where: (item) => eq(item.userId, userId),
    with: { images: true },
  });
}
