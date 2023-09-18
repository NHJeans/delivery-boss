// // prisma/seed.ts

// import { PrismaClient } from '@prisma/client';

// // initialize Prisma Client
// const prisma = new PrismaClient();


// model Comment {
//     id          Int      @id @default(autoincrement())
//     CustomerId  Int
//     OrderId     Int      @unique
//     StoreId     Int
//     review      String
//     star        Int
//     Customer    Customer @relation(fields: [CustomerId], references: [id], onUpdate: Cascade, onDelete: Cascade)
//     Order       Order    @relation(fields: [OrderId], references: [id], onUpdate: Cascade, onDelete: Cascade)       
//     Store       Store    @relation(fields: [StoreId], references: [id], onUpdate: Cascade, onDelete: Cascade)
//     }
    



// async function main() {
//   // create two dummy articles
// * upsert -> where 조건과 일치하는 기사가 없는 경우에만 새 기사 생성!!
//   const post1 = await prisma.Comment.upsert({
//     where: { title: 'hihi seed 연습해보쟝 근데 외래키 테이블 정보 없는데 되낭?? 안될 거 같은데 그냥 다음에 해보쟝' },
//     update: {},
//     create: {
//       title: 'Prisma Adds Support for MongoDB',
//       body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
//       description: "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
//       published: false,
//     },
//   });

//   const post2 = await prisma.article.upsert({
//     where: { title: "What's new in Prisma? (Q1/22)" },
//     update: {},
//     create: {
//       title: "What's new in Prisma? (Q1/22)",
//       body: 'Our engineers have been working hard, issuing new releases with many improvements...',
//       description: 'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
//       published: true,
//     },
//   });

//   console.log({ post1, post2 });
// }

// // execute the main function
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // close Prisma Client at the end
//     await prisma.$disconnect();
//   });
