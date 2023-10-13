import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    console.log("Starting...");
    const participants = await prisma.participant.findMany({})
    if (participants.length === 0){
        await prisma.participant.create({
            data:{
                name: 'Jhon Doe',
                balance: 2000,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        console.log('Participant was created');
    }

    const games = await prisma.game.findMany()
    if(games.length === 0){
        await prisma.game.create({
            data:{
                awayTeamName: 'Fluminense',
                awayTeamScore: 0,
                homeTeamName: 'Flamengo',
                homeTeamScore: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        console.log('Game was created');
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });