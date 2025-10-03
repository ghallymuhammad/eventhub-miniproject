import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import type { User } from '../types';

export class UserService {
  static async createUser(userData: {
    email: string;
    password: string;
    name: string;
    role?: 'USER' | 'ORGANIZER' | 'ADMIN';
  }): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<Omit<User, 'password'> | null> {
    return await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async changePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
  }

  static async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}
