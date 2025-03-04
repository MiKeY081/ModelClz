// backend/seed.js (Add this before console.log('Database seeded...'))
// Seed Attendance (10 records)
// backend/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const { hashSync } = bcrypt;


const prisma = new PrismaClient();
const createdUsers = await prisma.user.findMany();
const studentUsers = createdUsers.filter(u => u.role === "STUDENT");
const teacherUsers = createdUsers.filter(u => u.role === "TEACHER");

const createdStudents = await prisma.student.findMany();

const createdTeachers = await prisma.teacher.findMany();

const attendanceRecords = [
    { date: new Date("2025-03-01"), status: "PRESENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "sita.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-01"), status: "ABSENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "arjun.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-02"), status: "LATE", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "anu.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-02"), status: "PRESENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "bikash.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-03"), status: "PRESENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "nisha.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-03"), status: "ABSENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "sita.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-04"), status: "LATE", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "arjun.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-04"), status: "PRESENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "anu.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-05"), status: "PRESENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "bikash.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    { date: new Date("2025-03-05"), status: "ABSENT", studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "nisha.homie@homie.edu.np").id).id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
  ];
  await prisma.attendance.createMany({ data: attendanceRecords });
  
  // Add this right before console.log('Database seeded...')
  console.log('Attendance seeded, homie!');