import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, Link, Heading, Button, OpenNewIcon } from '@pancakeswap/uikit'
import { Result } from 'state/Flashloan/helpers'
import { getMultiplier } from '../../helpers'
import { PayoutRow, RoundResult } from '../RoundResult'


interface BetDetailsProps {
  bet: any
  result: Result
}

const StyledBetDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const BetDetails: React.FC<BetDetailsProps> = ({ bet, result }) => {
  const { t } = useTranslation()
  const bullMultiplier = getMultiplier(1, 2)
  const bearMultiplier = getMultiplier(1, 2)
  return (
    <StyledBetDetails>
      <Heading mb="8px">Flashloan Information</Heading>
      <RoundResult round={bet} mb="24px">
        <PayoutRow positionLabel={t('Up')} multiplier={bullMultiplier} amount={1} />
        <PayoutRow positionLabel={t('Down')} multiplier={bearMultiplier} amount={2} />
      </RoundResult>
     
      <Flex alignItems="center" justifyContent="center" mb="8px">
          <Link href={`https://kovan.etherscan.io/tx/${bet?.txhash}`} mb="16px" external>
            <Button mt="8px" width="100%">
                View Transactions More
              <OpenNewIcon color="white" ml="4px" />
            </Button>
          </Link>
      </Flex>

    </StyledBetDetails>
  )
}

export default BetDetails
