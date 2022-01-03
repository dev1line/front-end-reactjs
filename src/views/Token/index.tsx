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
    console.log("Start create")
    try {
      const ex = await handleTokenName.createToken(tokenName, tokenSymbol);
      const res = await ex.wait();
      console.log("create:", res);
      const newToken = await handleTokenName.tokenInstance();
      console.log("token:", newToken)
      toastSuccess("Create successfully !")
    } catch (err: any) {
      // console.log(err)
      toastError("Create fail !", err.message)
    }

   await handleGet();
  }
  const handleMint = async () => {
    console.log("Start mint")
    try {
      // const tx = await handleTokenName.mint("0xd100d3cD2aDA4260009575A976D1E78159e275D2", "0x4F08853c3a785198cbAd232980F5aca5b9681a27", ethers.utils.parseEther("0.123"));
      const tx = await handleTokenName.mint(addressToken, addressTo, amount);
      const res = await tx.wait();

      toastSuccess("Mint successfully !")
      console.log("mint:", res);
    } catch (err: any) {
      // console.log(err)
      toastError("Mint fail !", err.message)
    }
  } 
  const handleGet = async () => {
    try { 
      const newToken = await handleTokenName.getToken();
      console.log("token:", newToken)
      setTokenInfo(newToken);
      const newOwner = await handleTokenName.getOwner(newToken);
      setOwnerInfo(newOwner);
      console.log("owner:", newOwner)   
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    console.log(e.target.name)
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
      <Hero title="Create your token right now" sub_title='You could interact with contracts to create new special token. Let started !' />
      <Flex display="flex" flexDirection={"column"} justifyContent="space-around" alignItems="flex-start">
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center" padding="20px 0px">
      <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
            CREATE
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
          Create
        </Button>
        </Box>
      </Flex>
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center"  padding="20px 0px">
        <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
           MINT
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
          Mint
        </Button>
        </Box>
      </Flex>
      <Flex display="flex" flexDirection="column" width="100%" justifyContent="center" alignItems="center"  padding="20px 0px">
        <Box style={{width:document.documentElement.clientWidth > 768 ? '50%' : '75%', maxWidth: '500px', padding: 10, border: '4px solid #0db5fa', borderRadius: 15}}>
          <Heading>
          TOKEN INFORMATION
          </Heading>
        <Box>
           <Text>
            Token address:
          </Text>
          <Text>
           {tokenInfo}
          </Text>
        </Box>
        {/* <Box>
        <Text>
         Supply:
          </Text>
          <Text>
          
          </Text>
        </Box> */}
        <Box>
        <Text>
         Owner address:
          </Text>
          <Text>
           {ownerInfo}
          </Text>
        </Box>
        <Button width="100%" mt="14px" onClick={handleGet}>
         Get
        </Button>
        </Box>
      </Flex>
      </Flex>
    </>
  )
}

export default Token
