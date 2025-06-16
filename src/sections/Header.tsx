import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import LeaderboardsModal from '../sections/LeaderBoard/LeaderboardsModal'
import { PLATFORM_JACKPOT_FEE, PLATFORM_CREATOR_ADDRESS, ENABLE_LEADERBOARD } from '../constants'
import { useMediaQuery } from '../hooks/useMediaQuery'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'

// Бонусная кнопка
const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffe42d;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.1); }
`

// Кнопки в хедере
const HeaderButton = styled(GambaUi.Button)`
  background: transparent !important;
  border: 1px solid #ef3b92;
  color: #ef3b92;
  font-weight: bold;
  &:hover { background: rgba(239,59,146,0.2) !important; }
`

const StyledHeader = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   display: flex;
   align-items: center;
   padding: 15px 50px;
   z-index: 1001;
   background: none;
   backdrop-filter: none;

  & > .header-right {
       margin-left: auto;
       display: flex;
       gap: 10px;
       align-items: center;
     }
`

// Логотип со шрифтом Monoton и выделением
const Logo = styled(NavLink)`
  display: none;
  gap: 8px;
  align-items: center;
  font-family: 'Monoton', cursive;
  font-size: 2.2rem;
  font-weight: 600;
  text-decoration: none;
  /* Контейнер для читаемости */
  //background: rgba(5, 0, 20, 0.6);
  padding: 4px 12px;
  border-radius: 6px;

  span {
    /* Неоновое свечение и контур */
    text-shadow: 0 0 8px currentColor, 0 0 16px currentColor;
    -webkit-text-stroke: 1px rgba(0,0,0,0.8);
  }

  /* Синий/циановый неон для NEON */
  .neon { color: #00ccff; }
  /* Фиолетово-розовый неон для WAVE */
  .wave { color: #ff00cc; }
`

export default function Header() {
  const pool = useCurrentPool()
  const balance = useUserBalance()
  const isDesktop = useMediaQuery('lg')
  const [showLeaderboard, setShowLeaderboard] = React.useState(false)
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)

  return (
      <>
        <StyledHeader>
          <Logo to="/">
            <span className="neon">NEON</span>
            <span className="wave">WAVE</span>
          </Logo>

          <div className="header-right">
            {pool.jackpotBalance > 0 &&
                <Bonus onClick={() => setJackpotHelp(true)}>💰 <TokenValue amount={pool.jackpotBalance}/></Bonus>}
            {balance.bonusBalance > 0 &&
                <Bonus onClick={() => setBonusHelp(true)}>✨ <TokenValue amount={balance.bonusBalance}/></Bonus>}

            {isDesktop && <HeaderButton onClick={() => setShowLeaderboard(true)}>Leaderboard</HeaderButton>}

            <TokenSelect/>
            <UserButton/>
          </div>
        </StyledHeader>

        {/* При необходимости модалки Leaderboard, Help и т.п. */}
      </>
  )
}
