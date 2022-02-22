import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Flex,
  Button,
} from '@pancakeswap/uikit'
import { Heading2Text } from '../CompetitionHeadingText'
import { Link } from 'react-router-dom'

const StyledCard = styled(Card)`
  display: inline-flex;
  background: linear-gradient(180deg, #7645d9 0%, #452a7a 100%);

  svg {
    margin-bottom: 6px;
    height: 32px;
    width: auto;
    fill: ${({ theme }) => theme.colors.warning};
  }
`

const StyledButton = styled(Button)`
  margin: 16px 20px 0;
  z-index: 200;

  svg {
    margin: 0 4px 0 0;
    height: 20px;
    width: auto;
    fill: ${({ theme }) => theme.colors.textDisabled};
  }
`

const StyledHeadingText = styled(Heading2Text)`
  white-space: normal;
`

const BattleCta: React.FC = () => {

  return (
    <StyledCard>
      <CardBody>
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <StyledHeadingText>Hướng dẫn</StyledHeadingText>
            <Flex alignItems="flex-end">
             <Link to="/guide">
             <StyledButton>
             Khám phá ngay
              </StyledButton>
             </Link>
            </Flex>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default BattleCta
