import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  findById: (id: string) => Promise<CheckIn | null>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>
  countByUserId: (userId: string) => Promise<number>
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  save: (checkIn: CheckIn) => Promise<CheckIn>
}
