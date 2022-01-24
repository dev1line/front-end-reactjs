import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalHeader,
  InjectedModalProps,
  Text,
  Flex,
  Heading,
  Box,
  Input,
  ModalCloseButton,
  Button,

} from '@pancakeswap/uikit'
import { ethers } from 'ethers'
import CheckerABI from "../../../../config/abi/checker.json"
declare let window: any;
interface SelectCoinProps extends InjectedModalProps {
  list: any
  onSuccess?: () => Promise<void>
  onSelect: (e:any, item :object) => void
  isExchange?: boolean 
}

const Modal = styled(ModalContainer)`
  overflow: visible;
`

const Image = styled.img`
    width:20px;
    height:20px;
`
const SelectCoin: React.FC<SelectCoinProps> = ({
  list,
  isExchange = false,
  onSelect,
  onDismiss,
  onSuccess,
}) => {
  const [addressToken, setAddressToken] = useState("")
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const CheckerAddress = CheckerABI.networks["42"].address;
  const Checker = new ethers.Contract(
    CheckerAddress,
    CheckerABI.abi,
    signer
  )
    const [importToken, setImportToken] = useState({ name: "", symbol: "", address: "", image: ""});
  const handleCheckToken = async () => {
    try {
      const name = await Checker.name(addressToken);
      const symbol = await Checker.symbol(addressToken);
      // const totalSupply = await Checker.totalSupply(addressToken);
      setImportToken({
        name,
        symbol,
       image: '/img-coin/not-found.png',
        address: addressToken
      })
    } catch(err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setAddressToken(e.target.value);
  }
  return (
    <Modal minWidth="288px" position="relative" mt="124px">   
      <ModalHeader>
        <ModalTitle>
          <Heading>Select a Token</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody p="24px">
        <Flex flexDirection="column">
            <Box>
               <Flex display="flex" alignItems="center" justifyContent="space-between" my="10px">
                <Input id="referral-code" type="text" placeholder='Search name or paste address' value={addressToken} contentEditable="false" style={{marginRight: 10}} onChange={handleChange} />
                <Button onClick={handleCheckToken}>Import</Button>
               </Flex>
                <Box style={{overflowY:'scroll', height: 400, marginTop: 8, overflowX: 'hidden'}}>
                   
                    { importToken.name === "" ? list.map((item, index) => (                
                        (isExchange) ? 
                        <Box key={index} style={{display:"flex", alignItems:"center", cursor:'pointer'}} onClick={(e) => onSelect(e, item)}>
                            <Image className="sc-hWZktu hXvPxh" alt="ALPACA logo" src={item.image}/>
                            <Box style={{flex: 1, padding: '5px 10px'}}>
                                <Text fontSize='14px'>{item.provider}</Text>
                                <Text fontSize='14px'>{item.address}</Text>
                                <Text fontSize='14px'>{item?.suggest}</Text>
                            </Box>
                        </Box>   
                        :        
                        <Box key={index} style={{display:"flex", alignItems:"center", cursor:'pointer'}} onClick={(e) => onSelect(e, item)}>
                            <Image className="sc-hWZktu hXvPxh" alt="ALPACA logo" src={item.image}/>
                            <Box style={{flex: 1, padding: '5px 10px'}}>
                                <Text fontSize='14px'>{item.symbol}</Text>
                                <Text fontSize='14px'>{item.address}</Text>
                            </Box>
                        </Box>        
                    )) :                 
                    <Box style={{display:"flex", alignItems:"center", cursor:'pointer'}} onClick={(e) => onSelect(e, importToken)}>
                            <Image className="sc-hWZktu hXvPxh" alt="ALPACA logo" src="/img-coin/not-found.png" />
                            <Box style={{flex: 1, padding: '5px 10px'}}>
                                <Text fontSize='14px'>{importToken.symbol}</Text>
                                <Text fontSize='14px'>{importToken.address}</Text>
                            </Box>
                        </Box>  
                    }
                </Box>
            </Box>
            <Text textAlign="center" color="#1fc7d4" style={{cursor:'pointer',fontFamily: 'Kanit, sans-serif', padding: '24px 0px'}}>Manage Tokens</Text>
        </Flex>
      </ModalBody>
    </Modal>
  )
}

export default SelectCoin
