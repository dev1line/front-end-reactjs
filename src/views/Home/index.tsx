import React from 'react'
import { Flex, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { RulesIcon } from './svgs'
import {
  DARKBG,
  DARKFILL,
  LIGHTBLUEBG,
  LIGHTBLUEBG_DARK,
  LIGHTBLUEFILL,
  LIGHTBLUEFILL_DARK,
} from './components/Section/sectionStyles'

import RibbonWithImage from './components/RibbonWithImage'
import BattleBanner from './components/BattleBanner'
import Section from './components/Section'
import BattleCta from './components/BattleCta'
import PrizesInfo from './components/PrizesInfo'
import Rules from './components/Rules'
import { useTranslation } from 'contexts/Localization'

const CompetitionPage = styled.div`
  min-height: calc(100vh - 64px);
`

const BannerFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-top: 10px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  @media screen and (min-width: 1920px) {
    padding-top: 32px;
  }
`

const Home = () => {
  const { isDark } = useTheme()
  const { t } = useTranslation()
  return (
    <CompetitionPage>
      <Section  backgroundStyle={DARKBG}
       
        svgFill={DARKFILL}
        index={5}
        intersectComponent={<BattleCta /> }
      >
        <BannerFlex mb={false ? '0px' : '48px'}>
          <BattleBanner />
        </BannerFlex>
      </Section>

      <Section
        backgroundStyle={isDark ? LIGHTBLUEBG_DARK : LIGHTBLUEBG}
        svgFill={isDark ? LIGHTBLUEFILL_DARK : LIGHTBLUEFILL}
        index={2}
        noIntersection
      >
        <Box mb="78px">
          <PrizesInfo />
        </Box>
      </Section>

      <Section
        index={3}
        intersectionPosition="top"
        intersectComponent={
          <RibbonWithImage imageComponent={<RulesIcon width="175px" />} ribbonDirection="up">
           {t('Rules & Questions')}
          </RibbonWithImage>
        }
      >
        <Rules />
      </Section>

    </CompetitionPage>
  )
}

export default Home
