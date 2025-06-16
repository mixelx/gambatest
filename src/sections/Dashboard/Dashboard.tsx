import React from 'react'
import { SlideSection } from '../../components/Slider'
import { GAMES } from '../../games'
import { GameCard } from './GameCard'
import GameGrid from "./GameGrid"
import styled from "styled-components";

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '160px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  )
}

const GamesSection = styled.section`
  /* если хотите дополнительное пространство сверху/снизу секции */
  padding: 2rem 0 4rem;
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  /* увеличиваем расстояние до грида */
  margin-bottom: 2.5rem;
`

export default function Dashboard() {
    return (
        <GamesSection id="games">
            <Title>Games</Title>
            <GameGrid />
        </GamesSection>
    )
}
