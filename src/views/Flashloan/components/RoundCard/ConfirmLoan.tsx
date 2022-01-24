import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Button,
  Input,
  Text,
  Flex,
  Heading,
  ModalCloseButton,
} from '@pancakeswap/uikit'
interface ConfirmLoanProps extends InjectedModalProps {
  loan: number
  token: any
  onSuccess?: () => Promise<void>
  onConfirm: (e: any, amount: number) => void
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`

const Image = styled.img`
    // margin-right: 14px;
`
const ConfirmLoan: React.FC<ConfirmLoanProps> = ({ loan, token, onDismiss, onSuccess, onConfirm}) => {
  const [amount, setAmount] = useState(loan)
  const handleChange = (e) => {
    if(e.target.value.trim().length > 10) return;
    setAmount(e.target.value);
}
  return (
    <Modal minWidth="288px" position="relative" mt="124px">   
      <ModalHeader>
        <ModalTitle>
          <Heading>Setup Loan</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
          <Flex alignItems="center" justifyContent="space-between" mt="10px" >
            <Text style={{justifyContent:'center'}}>Token: </Text>
              <Flex alignItems="center" justifyContent="space-between" >
                <Text style={{justifyContent:'center', marginRight: 5}}>{token.symbol}</Text>
                <Image src={token.image} width="20px"  />
              </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mt="10px" mb="24px" >
            <Text>Loan: </Text>    
            <Input id="loan" type="number" value={amount} onChange={handleChange} style={{width: '69%'}} />         
          </Flex>
          <Button
            width="100%"
            mb="8px"
            onClick={e => onConfirm(e, amount)}
          >
          {"Confirm"}
          </Button>
      </ModalBody>
    </Modal>
  )
}

export default ConfirmLoan
