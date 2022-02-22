import React from 'react'
import { Flex, Text, Heading, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
import AllBunniesImage from '../../pngs/all-bunnies.png'
import { Heading2Text } from '../CompetitionHeadingText'
import { GOLDGRADIENT } from '../Section/sectionStyles'

const TextStyles = (theme) => `
  text-align: center;
  
  ${theme.mediaQueries.md} {
    text-align: left;
  }
`

const ImageWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const StyledText = styled(Text)`
  ${({ theme }) => TextStyles(theme)}
`

const StyledHeading2Text = styled(Heading2Text)`
  ${({ theme }) => TextStyles(theme)}
`

const StyledHeading = styled(Heading)`
  ${({ theme }) => TextStyles(theme)}
`

const BattleBanner = () => {
  return (
    <Flex flexDirection="column">
       <ImageWrapper>
        <Image src={AllBunniesImage} alt="all the bunnies" width={1208} height={659} responsive />
      </ImageWrapper>
      <StyledText mb="16px" color="textSubtle" bold>
        Start: October 01, 2021 End: January 30, 2022
      </StyledText>
      <StyledHeading2Text background={GOLDGRADIENT} $fill>
       ITF Flashloan
      </StyledHeading2Text>
      <StyledHeading scale="md" color="inputSecondary" mt="16px">
        {/* This is how to borrow money without collateral on blockchain platform */}
        Hãy cùng chúng tôi trải nghiệm ứng dụng vay chớp nhoáng trên nền tảng blockchain này
      </StyledHeading>
    </Flex>
  )
}

export default BattleBanner
