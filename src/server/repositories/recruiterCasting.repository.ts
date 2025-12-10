import { DbsCasting } from "../database";
import { recruiterCastings, recruiterCastingDetails } from "../database/schema";
import { eq, and } from "drizzle-orm";

export async function findById(id: string) {
  return await DbsCasting.query.recruiterCastings.findFirst({
    where: (item) => eq(item.id, id),
    with: { detail: true },
  });
}

export async function findByUser(recruiterId: string) {
  return await DbsCasting.query.recruiterCastings.findFirst({
    where: (item) => eq(item.recruiterId, recruiterId),
    with: { detail: true },
  });
}

export async function findDuplicateCasting(recruiterId: string, data: any) {
  return await DbsCasting.query.recruiterCastings.findFirst({
    where: (item) =>
      and(
        eq(item.recruiterId, recruiterId),
        eq(item.roleName, data.roleName),
        eq(item.type, data.type),
        eq(item.location, data.location)
      ),
    with: { detail: true },
  });
}

export async function createCasting(userId: string, data: any) {
  const inserted = await DbsCasting.insert(recruiterCastings)
    .values({
      recruiterId: userId,
      roleName: data.roleName,
      type: data.type,
      location: data.location,
      ageRange: data.ageRange,
      salary: data.salary,
      deadline: data.deadline ? new Date(data.deadline) : null,
      requirements: data.requirements,
      education: data.education,
      talents: data.talents,
      languages: data.languages,
      status: "OPEN",
    })
    .returning();

  return inserted[0];
}

export async function insertCastingDetail(castingId: string, detail: any) {
  return await DbsCasting.insert(recruiterCastingDetails).values({
    recruiterCastingId: castingId,
    movieTitle: detail.movieTitle,
    description: detail.description,
    posterKey: detail.posterKey,
    posterMime: detail.posterMime,
    posterSize: detail.posterSize,
  });
}
