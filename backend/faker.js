const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker'); // using @faker-js/faker
const prisma = new PrismaClient();

async function main() {
  // Generate fake users (students, teachers, parents)
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        role: 'STUDENT', // or 'TEACHER', 'PARENT', 'ADMIN'
      },
    });

    // Generate fake students linked to users
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        grade: faker.number.int({ min: 1, max: 12 }), // Corrected method
        section: faker.string.alpha({ length: 1, casing: 'upper' }),
        rollNumber: faker.string.uuid(),
      },
    });

    // Optionally, add fake parent information
    await prisma.parent.create({
      data: {
        userId: user.id,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      },
    });
  }

  // Generate fake courses
  for (let i = 0; i < 5; i++) {
    await prisma.course.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        subjectId: faker.string.uuid(),
        teacherId: faker.string.uuid(), // Random teacher ID
      },
    });
  }

  // Generate other models like assignments, grades, etc.
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
