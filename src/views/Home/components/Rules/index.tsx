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
        <RulesCard title={t('Giao dịch để tăng thứ hạng của bạn')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('Các cặp hợp lệ: DAI / BAT, BAT / DAI, ITF / DAI và DAI / ITF')}
          </Text>
        </RulesCard>
        <RulesCard title={t('Chơi như một nhà giao dịch')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('Lợi nhuận của bạn càng cao, giải thưởng của bạn càng tốt!')}
          </Text>
        </RulesCard>
      </StyledCardWrapper>
      <FAQs />
    </Wrapper>
  )
}

export default Rules
