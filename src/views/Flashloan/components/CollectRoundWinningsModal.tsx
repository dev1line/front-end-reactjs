import React from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Button,
  TrophyGoldIcon,
  Text,
  Flex,
  Heading,
  Box,
  ModalCloseButton,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { formatBnb } from '../helpers'

interface CollectRoundWinningsModalProps extends InjectedModalProps {
  payout: number
  roundId: string
  epoch: number
  onSuccess?: () => Promise<void>
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`

const BunnyDecoration = styled.div`
  position: absolute;
  top: -116px; // line up bunny at the top of the modal
  left: 0px;
  text-align: center;
  width: 100%;
`

const CollectRoundWinningsModal: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
}) => {
  const { t } = useTranslation()
  return (
    <Modal minWidth="288px" position="relative" mt="124px">
      <BunnyDecoration>
        <img src="/images/decorations/prize-bunny.png" alt="bunny decoration" height="124px" width="168px" />
      </BunnyDecoration>
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Collect Winnings')}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
        <TrophyGoldIcon width="96px" mx="auto" mb="24px" />
        <Flex alignItems="start" justifyContent="space-between" mb="24px">
          <Text>{t('Collecting')}</Text>
          <Box style={{ textAlign: 'right' }}>
            <Text>{`${formatBnb(payout)} BNB`}</Text>
           
          </Box>
        </Flex>
        <Button
          width="100%"
          mb="8px"
        >
          {t('Confirm')}
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default CollectRoundWinningsModal
