import {useWalletModal} from '@solana/wallet-adapter-react-ui'
import {GambaUi} from 'gamba-react-ui-v2'
import {useTransactionError} from 'gamba-react-v2'
import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {Modal} from './components/Modal'
import {TOS_HTML, ENABLE_TROLLBOX} from './constants'
import {useToast} from './hooks/useToast'
import {useUserStore} from './hooks/useUserStore'
import Dashboard from './sections/Dashboard/Dashboard'
import Game from './sections/Game/Game'
import Header from './sections/Header'
import {GlobalStyle, MainWrapper, TosInner, TosWrapper} from './styles'
import TrollBox from './components/TrollBox'
import styled from 'styled-components'
import RecentPlays from "./sections/RecentPlays/RecentPlays";

const HEADER_HEIGHT = 60;

// Под хедером (60px) hero займёт всю оставшуюся высоту
const HeroSection = styled.div`
    width: 100%;
    position: relative;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: 0;
    height: calc(100vh + ${HEADER_HEIGHT}px);
    padding-top: ${HEADER_HEIGHT}px;
    background-image: url('/hero2.png');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const HeroContent = styled.div`
   position: absolute;
   bottom: 100px;      /* подняли кнопку выше от самого низа */
   width: 100%;
   display: flex;
   justify-content: center;
 `

const PlayButton = styled.button`
    all: unset;
    cursor: pointer;
    padding: 16px 32px; /* увеличили padding */
    background: linear-gradient(45deg, #00ccff, #ff00cc);
    border-radius: 8px;
    color: #fff;
    font-size: 1.6rem; /* больше текст */
    font-weight: 900; /* жирнее шрифт */
    text-transform: uppercase;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 12px rgba(255, 0, 204, 0.8),
    0 0 24px rgba(0, 204, 255, 0.6);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 18px rgba(255, 0, 204, 1),
        0 0 36px rgba(0, 204, 255, 0.8);
    }
`


function ScrollToTop() {
    const {pathname} = useLocation()
    React.useEffect(() => window.scrollTo(0, 0), [pathname])
    return null
}

function ErrorHandler() {
    const walletModal = useWalletModal()
    const toast = useToast()
    const [error, setError] = React.useState<Error>()

    useTransactionError(
        (error) => {
            if (error.message === 'NOT_CONNECTED') {
                walletModal.setVisible(true)
                return
            }
            toast({title: '❌ Transaction error', description: error.error?.errorMessage ?? error.message})
        },
    )

    return (
        <>
            {error && (
                <Modal onClose={() => setError(undefined)}>
                    <h1>Error occured</h1>
                    <p>{error.message}</p>
                </Modal>
            )}
        </>
    )
}

export default function App() {
    const newcomer = useUserStore((state) => state.newcomer)
    const set = useUserStore((state) => state.set)

    return (
        <>
            <GlobalStyle/>
            {newcomer && (
                <Modal>
                    <h1>Welcome</h1>
                    <TosWrapper>
                        <TosInner dangerouslySetInnerHTML={{__html: TOS_HTML}}/>
                    </TosWrapper>
                    <p>
                        By playing on our platform, you confirm your compliance.
                    </p>
                    <GambaUi.Button main onClick={() => set({newcomer: false})}>
                        Acknowledge
                    </GambaUi.Button>
                </Modal>
            )}
            <ScrollToTop/>
            <ErrorHandler/>
            <Header/>
            <HeroSection>
                <HeroContent>
                    <PlayButton
                        onClick={() => {
                            document
                                .getElementById('games')
                                ?.scrollIntoView({behavior: 'smooth'})
                        }}>
                        Play
                    </PlayButton>
                </HeroContent>
            </HeroSection>
            <MainWrapper>

                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/:gameId" element={<Game/>}/>
                </Routes>
                <h2 style={{textAlign: 'center'}}>Recent Plays</h2>
                <RecentPlays />
            </MainWrapper>
            {ENABLE_TROLLBOX && <TrollBox/>}
        </>
    )
}
