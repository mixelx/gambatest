import React from 'react'
import styled, {keyframes} from 'styled-components'
import { GAMES } from '../../games'
import { GameCard } from './GameCard'

// Сетка 3×3
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 960px;
    margin: 0 auto;
`

const CardWrapper = styled.div<{ $bg: string }>`
    background: ${(p) => p.$bg};
    border-radius: 12px;
    height: 160px;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 0 .1rem #fff,
    0 0 .1rem #fff,
    0 0 1rem #bc13fe,
    0 0 0.8rem #bc13fe,
    0 0 1.8rem #bc13fe,
    inset 0 0 1.3rem #bc13fe;
    border: 0.15rem solid #fff;

    & > * {
        width: 100%;
        height: 100%;
    }
`

const bgMap: Record<string, string> = {
    dice:      'linear-gradient(135deg, #ff5e7e 0%, #ff85a2 100%)',
    slots:     'linear-gradient(135deg, #667aff 0%, #8c8eff 100%)',
    flip:      'linear-gradient(135deg, #ffe97a 0%, #fffeb5 100%)',
    hilo:      'linear-gradient(135deg, #ff4c4c 0%, #ff6c6c 100%)',
    mines:     'linear-gradient(135deg, #8a6cff 0%, #a68cff 100%)',
    roulette:  'linear-gradient(135deg, #1aff80 0%, #7cffb3 100%)',
    plinko:    'linear-gradient(135deg, #7a6aff 0%, #9c7cff 100%)',
    crash:     'linear-gradient(135deg, #da81ff 0%, #f0a8ff 100%)',
    blackjack: 'linear-gradient(135deg, #005c2b 0%, #009138 100%)',
}

export function GameGrid() {
    return (
        <Grid>
            {GAMES.slice(0, 9).map((game) => (
                <CardWrapper key={game.id} $bg={bgMap[game.id] || '#333'}>
                    <GameCard game={game} />
                </CardWrapper>
            ))}
        </Grid>
    )
}

export default GameGrid