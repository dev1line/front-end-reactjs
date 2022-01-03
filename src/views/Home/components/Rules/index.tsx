import React from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import RulesCard from './RulesCard'
import FAQs from './FAQs'

const Wrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-start;
  }
`

const StyledCardWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`

const Rules = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <StyledCardWrapper>
        <RulesCard title={t('Trade to increase your rank')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('Eligible pairs: DAI/BAT, BAT/DAI, ITF/DAI and DAI/ITF')}
          </Text>
        </RulesCard>
        <RulesCard title={t('Play as a trader')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('The higher your profit, the better your prizes!')}
          </Text>
        </RulesCard>
      </StyledCardWrapper>
      <FAQs />
    </Wrapper>
  )
}

export default Rules
