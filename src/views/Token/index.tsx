import React, { useState } from 'react'
import Hero from 'views/Guide/components/Hero'
import { Box, Button, Flex, Heading, Input, Text } from '@pancakeswap/uikit'
import HandleTokenABI from "../../config/abi/HandleToken.json"
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'


declare let window: any;

const Token: React.FC = () => {
  const { toastError, toastSuccess } = useToast()
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [addressToken, setAddressToken] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenInfo, setTokenInfo] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const HandleTokenAddress = HandleTokenABI.networks["42"].address;
  const handleTokenName = new ethers.Contract(
    HandleTokenAddress,
    HandleTokenABI.abi,
    signer
  )

  const handleCreate = async () => {

    try {
      const ex = await handleTokenName.createToken(tokenName, tokenSymbol);
      const res = await ex.wait();

      const newToken = await handleTokenName.tokenInstance();
   
      toastSuccess("Create successfully !")
    } catch (err: any) {
      console.log(err)
      toastError("Create fail !", err.message)
    }

   await handleGet();
  }
  const handleMint = async () => {
  
    try {
      // const tx = await handleTokenName.mint("0xd100d3cD2aDA4260009575A976D1E78159e275D2", "0x4F08853c3a785198cbAd232980F5aca5b9681a27", ethers.utils.parseEther("0.123"));
      const tx = await handleTokenName.mint(addressToken, addressTo, amount);
      const res = await tx.wait();

      toastSuccess("Mint successfully !")

    } catch (err: any) {
      console.log(err)
      toastError("Mint fail !", err.message)
    }
  } 
  const handleGet = async () => {
    try { 
      const newToken = await handleTokenName.getToken();
 
      setTokenInfo(newToken);
      const newOwner = await handleTokenName.getOwner(newToken);
      setOwnerInfo(newOwner);

    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {

    switch(e.target.name) {
      case "token-name": {
        setTokenName(e.target.value);
        break;
      }
      case "token-symbol": {
        setTokenSymbol(e.target.value);
        break;
      }
      case "token-address": {
        setAddressToken(e.target.value);
        break;
      }
      case "address-to": {
        setAddressTo(e.target.value);
        break;
      }
      case "amount": {
        setAmount(e.target.value);
        break;
      }
    }
  } 
  return (
    <>
      <Hero title="Tạo mã thông báo của bạn ngay bây giờ" sub_title='Bạn có thể tương tác với các hợp đồng để tạo mã thông báo đặc biệt mới. Hãy bắt đầu!' />
      <Flex display="flex" flexDirection={"column"} justifyContent="space-around" alignItems="flex-start">
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center" padding="20px 0px">
      <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
            Tạo mã thông báo (token) ERC-20
          </Heading>
        <Box>
        <Text>
            Token name:
          </Text>
          <Input type="text" name="token-name" value={tokenName} onChange={handleChange}></Input>
        </Box>
        <Box>
        <Text>
          Symbol:
          </Text>
          <Input type="text" name="token-symbol" value={tokenSymbol} onChange={handleChange}></Input>
        </Box>
        <Button width="100%" mt="14px" onClick={handleCreate}>
          Tạo
        </Button>
        </Box>
      </Flex>
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center"  padding="20px 0px">
        <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
          Tạo tổng cung (MINT totalSupply)
          </Heading>
        <Box>
        <Text>
            Token address:
          </Text>
          <Input type="text" name="token-address" value={addressToken} onChange={handleChange}></Input>
        </Box>
        <Box>
        <Text>
         To:
          </Text>
          <Input type="text" name="address-to" value={addressTo} onChange={handleChange}></Input>
        </Box>
        <Box>
        <Text>
         Amount:
          </Text>
          <Input type="text" name="amount" value={amount} onChange={handleChange}></Input>
        </Box>
        <Button width="100%" mt="14px" onClick={handleMint}>
        Tạo
        </Button>
        </Box>
      </Flex>
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center"  padding="20px 0px">
        <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
          Thông tin mã thông báo (Token)
          </Heading>
        <Box>
           <Text>
            Token address:
          </Text>
          <Text>
           {tokenInfo}
          </Text>
        </Box>
        <Box>
        <Text>
         Owner address:
          </Text>
          <Text>
           {ownerInfo}
          </Text>
        </Box>
        <Button width="100%" mt="14px" onClick={handleGet}>
        Lấy thông tin
        </Button>
        </Box>
      </Flex>
      </Flex>
    </>
  )
}

export default Token
