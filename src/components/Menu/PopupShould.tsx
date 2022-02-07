import React from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Button,
  Text,
  Flex,
  Heading,
  ModalCloseButton,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

interface PopupShouldProps extends InjectedModalProps {
  onSuccess?: () => Promise<void>
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`


const PopupShould: React.FC<PopupShouldProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation()
  return (
    <Modal minWidth="288px" position="relative" mt="124px">
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Notification')}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
        <Flex alignItems="start" justifyContent="space-between" mb="24px">
          <Text>{t('Please login to use referrals')}</Text> 
        </Flex>
        <Button
          width="100%"
          mb="8px"
          onClick={onDismiss}
        >
          {t('Back')}
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default PopupShould
