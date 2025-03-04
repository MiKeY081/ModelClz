// backend/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const { hashSync } = bcrypt;


const prisma = new PrismaClient();



async function seed() {
  try {
    // Clear data in dependency order
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.attendance.deleteMany({});
    await prisma.assignmentSubmission.deleteMany({});
    await prisma.assignment.deleteMany({});
    await prisma.enrollment.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.teacherSubject.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.parent.deleteMany({});
    await prisma.user.deleteMany({});

    // Seed Users (15: 5 Students, 5 Teachers, 5 Parents)
    const users = [
      { firstName: "Sita", lastName: "Thapa", email: "sita.homie@homie.edu.np", role: "STUDENT", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", bio: "Science enthusiast from Kathmandu!", phone: "+977-9841-123456", address: "Kapan, Kathmandu", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Ram", lastName: "Shrestha", email: "ram.homie@homie.edu.np", role: "TEACHER", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", bio: "Math guru shaping Nepal's future.", phone: "+977-9851-789012", address: "Lalitpur", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Gita", lastName: "Gurung", email: "gita.homie@homie.edu.np", role: "PARENT", avatar: "https://images.unsplash.com/photo-1517363898874-0ce241d20663", bio: "Proud mom cheering from Pokhara!", phone: "+977-9803-456789", address: "Lakeside, Pokhara", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Arjun", lastName: "Magar", email: "arjun.homie@homie.edu.np", role: "STUDENT", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", bio: "Football and coding—my passions!", address: "Bhaktapur", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Laxmi", lastName: "Tamang", email: "laxmi.homie@homie.edu.np", role: "TEACHER", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df", bio: "History teacher with a Nepali heart!", phone: "+977-9860-987654", address: "Patan, Lalitpur", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Hari", lastName: "Rai", email: "hari.homie@homie.edu.np", role: "PARENT", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", bio: "Supporting my kids from Biratnagar!", phone: "+977-9812-345678", address: "Biratnagar", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Anu", lastName: "Bhandari", email: "anu.homie@homie.edu.np", role: "STUDENT", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", bio: "Art is my escape—Namaste Nepal!", address: "Boudha, Kathmandu", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Krishna", lastName: "Adhikari", email: "krishna.homie@homie.edu.np", role: "TEACHER", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61", bio: "Physics lover from Chitwan!", phone: "+977-9843-567890", address: "Narayangarh, Chitwan", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Maya", lastName: "Karki", email: "maya.homie@homie.edu.np", role: "PARENT", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", bio: "Keeping the family strong in KTM!", phone: "+977-9804-123456", address: "Baneshwor, Kathmandu", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Bikash", lastName: "Lama", email: "bikash.homie@homie.edu.np", role: "STUDENT", avatar: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb", bio: "Tech geek from Dhulikhel!", address: "Dhulikhel", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Sunita", lastName: "Poudel", email: "sunita.homie@homie.edu.np", role: "TEACHER", avatar: "https://images.unsplash.com/photo-1534528744314-464b6b8396ef", bio: "Literature lights up Nepal’s youth!", phone: "+977-9851-234567", address: "Butwal", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Prem", lastName: "Nepal", email: "prem.homie@homie.edu.np", role: "PARENT", avatar: "https://images.unsplash.com/photo-1503443207922-dff7d9e9e8d4", bio: "Dad to future Nepali leaders!", phone: "+977-9817-890123", address: "Hetauda", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Nisha", lastName: "Bhattarai", email: "nisha.homie@homie.edu.np", role: "STUDENT", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df", bio: "Coding and coffee—Nepali style!", address: "Thamel, Kathmandu", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Dipak", lastName: "Khadka", email: "dipak.homie@homie.edu.np", role: "TEACHER", avatar: "https://images.unsplash.com/photo-1519085360753-5d7e9f7cbe7", bio: "Chemistry made fun in Dhangadhi!", phone: "+977-9861-345678", address: "Dhangadhi", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
      { firstName: "Radha", lastName: "Basnet", email: "radha.homie@homie.edu.np", role: "PARENT", avatar: "https://images.unsplash.com/photo-1502685104226-6e5b6e5b8e5e", bio: "Mom cheering from Birgunj!", phone: "+977-9805-678901", address: "Birgunj", password: hashSync("pass123", 10), createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.user.createMany({ data: users });
    const createdUsers = await prisma.user.findMany();

    const studentUsers = createdUsers.filter(u => u.role === "STUDENT");
    const teacherUsers = createdUsers.filter(u => u.role === "TEACHER");
    const parentUsers = createdUsers.filter(u => u.role === "PARENT");

    // Seed Students (5)
    const students = [
      { userId: studentUsers.find(u => u.email === "sita.homie@homie.edu.np").id, grade: 10, section: "A", rollNumber: "RN101", address: "Kapan, Kathmandu", phoneNumber: "+977-9841-123456", parentId: parentUsers.find(p => p.email === "gita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { userId: studentUsers.find(u => u.email === "arjun.homie@homie.edu.np").id, grade: 9, section: "B", rollNumber: "RN102", address: "Bhaktapur", parentId: parentUsers.find(p => p.email === "hari.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { userId: studentUsers.find(u => u.email === "anu.homie@homie.edu.np").id, grade: 11, section: "C", rollNumber: "RN103", address: "Boudha, Kathmandu", parentId: parentUsers.find(p => p.email === "maya.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { userId: studentUsers.find(u => u.email === "bikash.homie@homie.edu.np").id, grade: 8, section: "A", rollNumber: "RN104", address: "Dhulikhel", createdAt: new Date(), updatedAt: new Date() },
      { userId: studentUsers.find(u => u.email === "nisha.homie@homie.edu.np").id, grade: 12, section: "B", rollNumber: "RN105", address: "Thamel, Kathmandu", parentId: parentUsers.find(p => p.email === "radha.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.student.createMany({ data: students });
    const createdStudents = await prisma.student.findMany();

    // Seed Teachers (5)
    const teachers = [
      { userId: teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id, qualification: "MSc Mathematics", experience: 10, address: "Lalitpur", phoneNumber: "+977-9851-789012", createdAt: new Date(), updatedAt: new Date() },
      { userId: teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id, qualification: "MA History", experience: 15, address: "Patan, Lalitpur", phoneNumber: "+977-9860-987654", createdAt: new Date(), updatedAt: new Date() },
      { userId: teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id, qualification: "PhD Physics", experience: 8, address: "Narayangarh, Chitwan", phoneNumber: "+977-9843-567890", createdAt: new Date(), updatedAt: new Date() },
      { userId: teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id, qualification: "BA Literature", experience: 12, address: "Butwal", phoneNumber: "+977-9851-234567", createdAt: new Date(), updatedAt: new Date() },
      { userId: teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id, qualification: "BSc Chemistry", experience: 7, address: "Dhangadhi", phoneNumber: "+977-9861-345678", createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.teacher.createMany({ data: teachers });
    const createdTeachers = await prisma.teacher.findMany();

    // Seed Parents (5)
    const parents = [
      { userId: parentUsers.find(u => u.email === "gita.homie@homie.edu.np").id, phone: "+977-9803-456789", address: "Lakeside, Pokhara", createdAt: new Date(), updatedAt: new Date() },
      { userId: parentUsers.find(u => u.email === "hari.homie@homie.edu.np").id, phone: "+977-9812-345678", address: "Biratnagar", createdAt: new Date(), updatedAt: new Date() },
      { userId: parentUsers.find(u => u.email === "maya.homie@homie.edu.np").id, phone: "+977-9804-123456", address: "Baneshwor, Kathmandu", createdAt: new Date(), updatedAt: new Date() },
      { userId: parentUsers.find(u => u.email === "prem.homie@homie.edu.np").id, phone: "+977-9817-890123", address: "Hetauda", createdAt: new Date(), updatedAt: new Date() },
      { userId: parentUsers.find(u => u.email === "radha.homie@homie.edu.np").id, phone: "+977-9805-678901", address: "Birgunj", createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.parent.createMany({ data: parents });

    // Seed Subjects (5)
    const subjects = [
      { name: "Mathematics", code: "SUB101", description: "Core math concepts for all grades.", createdAt: new Date(), updatedAt: new Date() },
      { name: "Science", code: "SUB102", description: "Exploring the wonders of nature!", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nepali", code: "SUB103", description: "Language and culture of Nepal.", createdAt: new Date(), updatedAt: new Date() },
      { name: "Social Studies", code: "SUB104", description: "History and geography of Nepal.", createdAt: new Date(), updatedAt: new Date() },
      { name: "English", code: "SUB105", description: "Mastering global communication.", createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.subject.createMany({ data: subjects });
    const createdSubjects = await prisma.subject.findMany();

    // Seed Courses (5)
    const courses = [
      { name: "Grade 10 Math", description: "Advanced algebra and geometry.", subjectId: createdSubjects.find(s => s.name === "Mathematics").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { name: "Science Basics", description: "Intro to physics and biology.", subjectId: createdSubjects.find(s => s.name === "Science").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { name: "Nepali Literature", description: "Poetry and prose in Nepali.", subjectId: createdSubjects.find(s => s.name === "Nepali").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { name: "Social Studies 9", description: "Nepal’s rich history.", subjectId: createdSubjects.find(s => s.name === "Social Studies").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { name: "English Grammar", description: "Building strong language skills.", subjectId: createdSubjects.find(s => s.name === "English").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.course.createMany({ data: courses });
    const createdCourses = await prisma.course.findMany();

    // Seed Enrollments (10)
    const enrollments = [
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "sita.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Grade 10 Math").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "sita.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Science Basics").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "arjun.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Social Studies 9").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "arjun.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "English Grammar").id, enrolledAt: new Date(), status: "COMPLETED", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "anu.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Nepali Literature").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "anu.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Science Basics").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "bikash.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "English Grammar").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "bikash.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Social Studies 9").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "nisha.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Grade 10 Math").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
      { studentId: createdStudents.find(s => s.userId === studentUsers.find(u => u.email === "nisha.homie@homie.edu.np").id).id, courseId: createdCourses.find(c => c.name === "Nepali Literature").id, enrolledAt: new Date(), status: "ACTIVE", createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.enrollment.createMany({ data: enrollments });

    // Seed Assignments (10)
    const assignments = [
      { title: "Algebra Quiz", description: "Solve quadratic equations.", dueDate: new Date("2025-03-10"), status: "PENDING", courseId: createdCourses.find(c => c.name === "Grade 10 Math").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Physics Experiment", description: "Build a simple circuit.", dueDate: new Date("2025-03-15"), status: "COMPLETED", courseId: createdCourses.find(c => c.name === "Science Basics").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Nepali Poem", description: "Write a poem about Dashain.", dueDate: new Date("2025-03-12"), status: "COMPLETED" ,courseId: createdCourses.find(c => c.name === "Nepali Literature").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "History Essay", description: "Nepal’s unification.", dueDate: new Date("2025-03-20"), status: "COMPLETED" ,courseId: createdCourses.find(c => c.name === "Social Studies 9").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Grammar Test", description: "Tenses and verbs practice.", dueDate: new Date("2025-03-18"), status: "PENDING", courseId: createdCourses.find(c => c.name === "English Grammar").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Math Homework", description: "Geometry problems.", dueDate: new Date("2025-03-14"),  status: "PENDING",courseId: createdCourses.find(c => c.name === "Grade 10 Math").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "ram.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Science Report", description: "Renewable energy sources.", dueDate: new Date("2025-03-22"), status: "PENDING", courseId: createdCourses.find(c => c.name === "Science Basics").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "krishna.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Nepali Story", description: "Short story in Nepali.", dueDate: new Date("2025-03-17"),status: "COMPLETED", courseId: createdCourses.find(c => c.name === "Nepali Literature").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "sunita.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "Social Project", description: "Map of Nepal’s provinces.", dueDate: new Date("2025-03-25"), status: "OVERDUE", courseId: createdCourses.find(c => c.name === "Social Studies 9").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
      { title: "English Essay", description: "Importance of education.", dueDate: new Date("2025-03-19"), status: "OVERDUE", courseId: createdCourses.find(c => c.name === "English Grammar").id, teacherId: createdTeachers.find(t => t.userId === teacherUsers.find(u => u.email === "dipak.homie@homie.edu.np").id).id, createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.assignment.createMany({ data: assignments });
    const createdAssignments = await prisma.assignment.findMany();

    // Seed Posts (10)
    const posts = [
      { content: "Just finished my science project—Nepal’s hydropower rocks!", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7", tags: ["Science", "Nepal"], likes: 24, authorId: createdUsers.find(u => u.email === "sita.homie@homie.edu.np").id, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { content: "Proud of our students at the Kathmandu Math Olympiad!", tags: ["Math", "Achievement"], likes: 45, authorId: createdUsers.find(u => u.email === "ram.homie@homie.edu.np").id, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { content: "Dashain prep in Pokhara—family time!", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", tags: ["Dashain", "Family"], likes: 15, authorId: createdUsers.find(u => u.email === "gita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Scored a goal today—Nepali football rules!", tags: ["Sports", "Nepal"], likes: 10, authorId: createdUsers.find(u => u.email === "arjun.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "History lesson on Prithvi Narayan Shah today!", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba", tags: ["History", "Nepal"], likes: 20, authorId: createdUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "My kids aced their exams—proud dad moment!", tags: ["Family", "Achievement"], likes: 12, authorId: createdUsers.find(u => u.email === "hari.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Art project inspired by Kathmandu streets!", image: "https://images.unsplash.com/photo-1543722530-d9c3201379e7", tags: ["Art", "Kathmandu"], likes: 18, authorId: createdUsers.find(u => u.email === "anu.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Physics lab was a blast—literally!", image: "https://images.unsplash.com/photo-1532094349884-543bc11c3b94", tags: ["Physics", "Fun"], likes: 25, authorId: createdUsers.find(u => u.email === "krishna.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Teaching kids to love Nepali poetry!", tags: ["Nepali", "Literature"], likes: 30, authorId: createdUsers.find(u => u.email === "sunita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Coding a game about Nepal’s mountains!", image: "https://images.unsplash.com/photo-1542038784456-1ea3e6b2e6e5", tags: ["Coding", "Nepal"], likes: 22, authorId: createdUsers.find(u => u.email === "nisha.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.post.createMany({ data: posts });
    const createdPosts = await prisma.post.findMany();

    // Seed Comments (15)
    const comments = [
      { content: "Great work, Sita!", postId: createdPosts.find(p => p.content.includes("science project")).id, authorId: createdUsers.find(u => u.email === "ram.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "So proud of you all!", postId: createdPosts.find(p => p.content.includes("Kathmandu Math")).id, authorId: createdUsers.find(u => u.email === "gita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Happy Dashain, Gita!", postId: createdPosts.find(p => p.content.includes("Dashain prep")).id, authorId: createdUsers.find(u => u.email === "hari.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Awesome kick, Arjun!", postId: createdPosts.find(p => p.content.includes("Scored a goal")).id, authorId: createdUsers.find(u => u.email === "anu.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "History rocks!", postId: createdPosts.find(p => p.content.includes("Prithvi Narayan")).id, authorId: createdUsers.find(u => u.email === "sita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Congrats, kids!", postId: createdPosts.find(p => p.content.includes("aced their exams")).id, authorId: createdUsers.find(u => u.email === "maya.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Love the colors, Anu!", postId: createdPosts.find(p => p.content.includes("Art project")).id, authorId: createdUsers.find(u => u.email === "nisha.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "That sounds fun!", postId: createdPosts.find(p => p.content.includes("Physics lab")).id, authorId: createdUsers.find(u => u.email === "bikash.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Beautiful words!", postId: createdPosts.find(p => p.content.includes("Nepali poetry")).id, authorId: createdUsers.find(u => u.email === "arjun.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Can’t wait to play it!", postId: createdPosts.find(p => p.content.includes("Coding a game")).id, authorId: createdUsers.find(u => u.email === "laxmi.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Amazing project!", postId: createdPosts.find(p => p.content.includes("science project")).id, authorId: createdUsers.find(u => u.email === "krishna.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Math champs!", postId: createdPosts.find(p => p.content.includes("Kathmandu Math")).id, authorId: createdUsers.find(u => u.email === "sunita.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Festive vibes!", postId: createdPosts.find(p => p.content.includes("Dashain prep")).id, authorId: createdUsers.find(u => u.email === "prem.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Nice goal!", postId: createdPosts.find(p => p.content.includes("Scored a goal")).id, authorId: createdUsers.find(u => u.email === "dipak.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
      { content: "Cool game idea!", postId: createdPosts.find(p => p.content.includes("Coding a game")).id, authorId: createdUsers.find(u => u.email === "radha.homie@homie.edu.np").id, createdAt: new Date(), updatedAt: new Date() },
    ];
    await prisma.comment.createMany({ data: comments });

    console.log('Database seeded with Nepali fake data, homie!');
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();