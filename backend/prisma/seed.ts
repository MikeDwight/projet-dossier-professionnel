import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding the database...");

  // Création d'un utilisateur test
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      password: "$2b$10$hashedpassword",
      firstname: "John",
      lastname: "Doe",
    },
  });

  // Ajout de cartes Pokémon pour ce user
  await prisma.card.createMany({
    data: [
      {
        name: "Pikachu",
        number: 25,
        serie: "Base Set",
        bloc: "Wizards of the Coast",
        imageUrl: "https://example.com/pikachu.jpg",
        userId: user.id,
      },
      {
        name: "Charizard",
        number: 4,
        serie: "Base Set",
        bloc: "Wizards of the Coast",
        imageUrl: "https://example.com/charizard.jpg",
        userId: user.id,
      },
    ],
  });

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
