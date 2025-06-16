import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
  }

  body {
      /* Два слоя фона: градиент + картинка */
      background-image:
          /* 1. градиент: от черного к прозрачному за 600px вниз */
              linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 600px),
                  /* 2. сама картинка */
              url('/background.png');

      /* Повторения нет, центровать */
      background-repeat: no-repeat, no-repeat;
      background-position: top center, center center;
      /* Градиент растягивается по ширине, высота auto; картинка — cover */
      background-size: 100% auto, cover;
      /* Градиент скроллится вместе со страницей, картинка фиксирована */
      background-attachment: scroll, fixed;

      color: #fff;
      font-family: sans-serif;
  }

  /* сбросим фон у основных контейнеров, чтобы не перекрывали */
  #root > * {
    background-color: transparent;
  }
`;


export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  transition: width .25s ease, padding .25s ease;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
  @media (min-width: 600px) {
    padding: 20px;
    width: 1000px;
  }
  @media (min-width: 1280px) {
    padding: 20px;
    width: 1100px;
  }
`

export const TosWrapper = styled.div`
  position: relative;
  &:after {
    content: " ";
    background: linear-gradient(180deg, transparent, #15151f);
    height: 50px;
    pointer-events: none;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
`

export const TosInner = styled.div`
  max-height: 400px;
  padding: 10px;
  overflow: auto;
  position: relative;
`
