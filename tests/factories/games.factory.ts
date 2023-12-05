import { prisma } from '../../src/config'
import { type Game } from '@prisma/client'

export class GamesFactory {
  private homeTeamName!: string
  private awayTeamName!: string

  setHomeTeamName(team: string) {
    this.homeTeamName = team
    return this
  }

  setAwayTeamName(team: string) {
    this.awayTeamName = team
    return this
  }

  setBuild(): Omit<Game, 'id'> {
    return {
      homeTeamName: this.homeTeamName,
      awayTeamName: this.awayTeamName,
      awayTeamScore: 0,
      homeTeamScore: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isFinished: false,
    }
  }

  async createGame() {
    const game = this.setBuild()
    return await prisma.game.create({
      data: game,
    })
  }
}
