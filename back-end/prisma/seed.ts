import { prisma } from "../src/db/db";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../src/helper/hasher";

async function seedingNote() {
  const hashedPassword = await hashPassword("password");

  const fakeUsers = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: "user",
  }));

  const fakeNotes = Array.from({ length: 50 }).map(() => ({
    title: faker.lorem.sentence(5),
    content: faker.lorem.paragraph(20),
    userId: faker.number.int({ min: 1, max: 11 }),
    publish: faker.datatype.boolean(),
  }));

  try {
    //seed admin user
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    });
    //seed fake normal users
    await prisma.user.createMany({
      data: fakeUsers,
    });

    //seed fake notes
    await prisma.note.createMany({
      data: fakeNotes,
    });
  } catch (error) {
    console.log(error);
  }
}
console.log("Starting seeding...");
seedingNote().then(() => {
  console.log("Seeding completed");
});
