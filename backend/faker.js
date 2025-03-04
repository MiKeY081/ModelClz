// backend/seed.js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Clear data in dependency order (children before parents)
    await prisma.assignmentSubmission.deleteMany({});
    await prisma.teacherSubject.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.attendance.deleteMany({});
    await prisma.grade.deleteMany({});
    await prisma.assignment.deleteMany({});
    await prisma.enrollment.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.achievement.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.parent.deleteMany({});
    await prisma.user.deleteMany({});

    // Seed Users (10 students, 2 teachers, 3 parents)
    const users = [];
    for (let i = 0; i < 15; i++) {
      const role = i < 10 ? 'STUDENT' : i < 12 ? 'TEACHER' : 'PARENT';
      users.push({
        email: faker.internet.email(),
        password: faker.internet.password(), // Hash in prod!
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role,
        avatar: faker.image.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      });
    }
    await prisma.user.createMany({ data: users });
    const createdUsers = await prisma.user.findMany();

    // Split users by role
    const studentUsers = createdUsers.filter(u => u.role === 'STUDENT');
    const teacherUsers = createdUsers.filter(u => u.role === 'TEACHER');
    const parentUsers = createdUsers.filter(u => u.role === 'PARENT');

    // Seed Students (10 students linked to student users)
    const students = studentUsers.map(user => ({
      userId: user.id,
      grade: faker.number.int({ min: 1, max: 12 }),
      section: faker.helpers.arrayElement(['A', 'B', 'C']),
      rollNumber: `RN${faker.number.int({ min: 1000, max: 9999 })}`,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.student.createMany({ data: students });
    const createdStudents = await prisma.student.findMany();

    // Seed Teachers (2 teachers linked to teacher users)
    const teachers = teacherUsers.map(user => ({
      userId: user.id,
      qualification: faker.person.jobTitle(),
      experience: faker.number.int({ min: 1, max: 20 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.teacher.createMany({ data: teachers });
    const createdTeachers = await prisma.teacher.findMany();

    // Seed Parents (3 parents linked to parent users, some with students)
    const parents = parentUsers.map((user, i) => ({
      userId: user.id,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.parent.createMany({ data: parents });
    const createdParents = await prisma.parent.findMany();

    // Link some students to parents
    for (let i = 0; i < Math.min(5, createdStudents.length); i++) {
      await prisma.student.update({
        where: { id: createdStudents[i].id },
        data: { parentId: faker.helpers.arrayElement(createdParents).id },
      });
    }

    // Seed Subjects (5 subjects)
    const subjects = Array.from({ length: 5 }, () => ({
      name: faker.lorem.word(),
      code: `SUB${faker.number.int({ min: 100, max: 999 })}`,
      description: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.subject.createMany({ data: subjects });
    const createdSubjects = await prisma.subject.findMany();

    // Seed Courses (5 courses linked to teachers and subjects)
    const courses = Array.from({ length: 5 }, () => ({
      name: `${faker.company.buzzPhrase()} Course`,
      description: faker.lorem.paragraph(),
      subjectId: faker.helpers.arrayElement(createdSubjects).id,
      teacherId: faker.helpers.arrayElement(createdTeachers).id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.course.createMany({ data: courses });
    const createdCourses = await prisma.course.findMany();

    // Seed Assignments (10 assignments linked to courses and teachers)
    const assignments = Array.from({ length: 10 }, () => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      dueDate: faker.date.future(),
      courseId: faker.helpers.arrayElement(createdCourses).id,
      teacherId: faker.helpers.arrayElement(createdTeachers).id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.assignment.createMany({ data: assignments });
    const createdAssignments = await prisma.assignment.findMany();

    // Seed Posts (20 posts from random users)
    const posts = Array.from({ length: 20 }, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: faker.helpers.arrayElement(createdUsers).id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.post.createMany({ data: posts });
    const createdPosts = await prisma.post.findMany();

    // Seed Achievements (15 achievements for random users)
    const achievements = Array.from({ length: 15 }, () => ({
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      date: faker.date.past(),
      userId: faker.helpers.arrayElement(createdUsers).id,
      category: faker.helpers.arrayElement(['academic', 'competition', 'research']),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.achievement.createMany({ data: achievements });

    // Seed Comments (10 comments on random posts)
    const comments = Array.from({ length: 10 }, () => ({
      content: faker.lorem.sentence(),
      postId: faker.helpers.arrayElement(createdPosts).id,
      authorId: faker.helpers.arrayElement(createdUsers).id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    }));
    await prisma.comment.createMany({ data: comments });

    console.log('Database seeded with fake data, homie!');
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();