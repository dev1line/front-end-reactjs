import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import { Stepper, Step, StepStatus, Card, CardBody, Heading, Text, Button, Link, OpenNewIcon } from '@pancakeswap/uikit'
import { Ifo } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/layout/Container'
interface Props {
  ifo: Ifo
}

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const Guideteps: React.FC<Props> = ({ ifo }) => {
  const { t } = useTranslation()
  const stepsValidationStatus = [
    true,
   true,
   1,
    2
  ]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Kích hoạt Ví của bạn')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('Bạn sẽ cần một Ví Ethereum đang hoạt động để tham gia một flashloan đơn giản!')}
            </Text>
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Nhận một ít ETH vào ví của bạn')}
            </Heading>
            <Text color="textSubtle" small>
              {t('Bạn sẽ nhận được nhiều ETH hơn trong liên kết bên dưới này')}
            </Text>
            <Button
              as={Link}
              external
              href={`https://faucets.chain.link/`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t('Nhận ETH trong testnet')}
            </Button>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Mở tab Flashloan và bắt đầu flashloan')}
            </Heading>
            <Text color="textSubtle" small>
              {t('Tạo một khoản vay mà bạn cần')} <br />
              {t('Thêm các hành động để sử dụng khoản vay của bạn một cách khôn ngoan')} <br />
              {t('Chỉnh sửa các trao đổi và mã thông báo bạn muốn một cách hợp lý')} <br />
              {t('Phê duyệt đầu vào mã thông báo nếu mã thông báo không chấp thuận trước đó')} <br />
              {t('Bắt đầu flashloan')} <br />
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Yêu cầu mã thông báo và thành tích của bạn')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'Sau khi giao dịch thành công, bạn có thể nhận được lợi nhuận',
              )}  <br />
                 {t('Nếu không thành công, bạn chỉ mất một ít phí để tạo giao thức cho khoản vay')} <br />
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" scale="xl" color="secondary" mb="24px" textAlign="center">
        {t('Làm thế nào để tham gia')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} index={index} status={getStatusProp(index)}>
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default Guideteps
