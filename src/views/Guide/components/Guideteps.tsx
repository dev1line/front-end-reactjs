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
              {t('Activate your Wallet')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('You’ll need an active Ethereum Wallet to take part in a simple flashloan!')}
            </Text>
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Get a little ETH into your wallet')}
            </Heading>
            <Text color="textSubtle" small>
              {t('You’ll get more ETH in this below link')}
            </Text>
            <Button
              as={Link}
              external
              href={`https://faucets.chain.link/`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t('Get ETH in testnet')}
            </Button>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Open Flashloan tab and initiate a flashloan')}
            </Heading>
            <Text color="textSubtle" small>
              {t('Create a loan that you need')} <br />
              {t('Add actions to use your loan wisely')} <br />
              {t('Edit exchanges and tokens you want reasonably')} <br />
              {t('Approve token input if token do not approve before')} <br />
              {t('Start flashloan')} <br />
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Claim your tokens and achievement')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'After transaction success, you can claim a profit',
              )}  <br />
                 {t('If it fail, you only lost a little fee to create protocol for loan')} <br />
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
        {t('How to Take Part')}
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
