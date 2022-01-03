import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Heading, Image, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import FlipperBunny from '../../pngs/flippers.png'
import { Link } from 'react-router-dom'

const StyledFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1;
  }
`

const ImageWrapper = styled.div`
  width: 200px;
  margin: 40px auto 0;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const PrizesText = () => {
  const { t } = useTranslation()

  return (
    <StyledFlex flexDirection="column" mb="32px">
      <Text mb="24px">{t('Every eligible participant will win prizes at the end of the transaction.')}</Text>
      <Heading color="secondary" mb="24px" scale="lg">
        {t('Join us to receive attractive gifts!')}
      </Heading>
     <Link to="/flashloan">
     <Button>
     <Text>
        {t(
          'Flashloan Now !',
        )}
      </Text>
     </Button>
     </Link>
      <ImageWrapper>
        <Image src={FlipperBunny} alt="Flipper bunny" responsive width={499} height={400} />
      </ImageWrapper>
    </StyledFlex>
  )
}

export default PrizesText
