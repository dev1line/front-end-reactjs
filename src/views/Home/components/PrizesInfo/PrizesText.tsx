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
      <Text mb="24px">{t('Mọi người tham gia đủ điều kiện sẽ giành được giải thưởng khi kết thúc giao dịch')}</Text>
      <Heading color="secondary" mb="24px" scale="lg">
        {t('Tham gia cùng chúng tôi để nhận những phần quà hấp dẫn!')}
      </Heading>
     <Link to="/flashloan">
     <Button>
     <Text>
        {t(
          'Vay ngay nào !',
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
