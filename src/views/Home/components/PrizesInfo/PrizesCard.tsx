import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, Box, Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PrizesGrid from './PrizesGrid'

const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`

const PrizesCard = () => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <CardHeader>
        <Heading scale="lg" color="secondary">
        Xếp hạng
        </Heading>
        <Text color="textSubtle" fontSize="14px">
          {t('Khối lượng giao dịch cao hơn = thứ hạng cao hơn!')}
        </Text>
      </CardHeader>
      <PrizesGrid />
      <Box p="24px">
        <Text color="textSubtle" fontSize="14px">   
          {t('Giải thưởng sẽ được phân phối dưới dạng mã thông báo ITF và được chia sẻ bởi tất cả các thành viên của một cấp. Giá mã thông báo ITF bằng USD sẽ được xác định vào ngày phân phối. Chi tiết bên dưới.')}
        </Text>
      </Box>
    </StyledCard>
  )
}

export default PrizesCard
