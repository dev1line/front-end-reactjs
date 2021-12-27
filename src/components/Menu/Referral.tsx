import React, { useEffect, useState } from 'react'
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
  ButtonMenuItem,
  ButtonMenu,
  ModalCloseButton,
  Button,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { CHECK_ACCOUNT, GET_YOUR_ACCOUNT } from 'query/general'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_REFERRAL } from 'query/mutation'

interface CollectRoundWinningsModalProps extends InjectedModalProps {
  payout: number
  roundId: string
  epoch: number
  onSuccess?: () => Promise<void>
  onDismiss?:() => void
  onClose: () => void
}

const ButtonMenus = styled(ButtonMenu)`
    width:100%;
    justify-content: space-between !important;
    display:flex !important;
`
const Wrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`
const Image = styled.img`
    // margin-right: 14px;
`
const ModalHeaders = styled(ModalHeader)`
    background: linear-gradient(139.73deg , rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
`
const Tdcpn = styled.td`
    color: rgb(123 94 187);
    margin: 2px; 
    padding: 4px 5px; 
    font-size: 12px;
    vertical-align:middle !important;
`

const Headinger = styled(Heading)`
  color: rgb(118, 69, 217);
  line-height: 1.5;
  text-transform: uppercase;
  margin-top: 18px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: bold;
`
const Boxer = styled.div`
 & > button > svg {
   fill:rgb(40, 13, 95);
 }
`
const WrapperBoder = styled.div`
  background-color: rgb(246, 246, 246);
  border-bottom: 1px solid rgb(231, 227, 235);
  padding: 16px 24px;
  & > div {
    display: flex !important;
    justify-content: space-between;
  }
`
const Referral: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
  onClose
}) => {
  const [index, setIndex] = useState(0);  
  const {account} = useWeb3React();
  const [referralCode, setReferralCode] = useState(reverseString(account));
  const [referralCodeFrom, setReferralCodeFrom] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [createReferral] = useMutation(CREATE_REFERRAL);
  const [isHide, setIsHide] = useState(false);
  const handleClickMenu = (index) => {
    setIndex(index);
    console.log(index)
  }
  const handleChange = (e) => {
      switch(e.target.name) {
        case "referral": {
          // setReferralCode(e.target.value);
          return;
        }
        case "referral-from": {
          setReferralCodeFrom(e.target.value);
          return;
        }
        default: return;
      }
  }
  function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
  const handleCopy = () => {
    function copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
          // navigator clipboard api method'
          return navigator.clipboard.writeText(textToCopy);
      } else {
          // text area method
          let textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          // make the textarea out of viewport
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise((res, rej) => {
              // here the magic happens
              document.execCommand('copy') ? res("") : rej();
              textArea.remove();
          });
      }
    }
    copyToClipboard(referralCode)
    .then(() => {
      console.log('text copied !');
      //reset for not warning ... to smile

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 300);
    })
    .catch(() => console.log('error'));
  }
  const {
    loading: fetching,  
    error,
    data: checkAccountExist = {},
    refetch,
  } = useQuery(CHECK_ACCOUNT);
  const {
    loading,  
    error: err,
    data: yourAccount = {},
    refetch: refetcher,
  } = useQuery(GET_YOUR_ACCOUNT);

  useEffect(() => {
    refetcher({
      variables: {
        sender: account || ""
    }
  });
  }, []);
  console.log("yourAccount id", yourAccount)
  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const handleSendReferralCode = async () => {
    console.log("value now to submit", checkAccountExist)
    refetch({
      variables: {
        sender:reverseString(referralCodeFrom) || ""
    }
    });
    if(checkAccountExist?.account?.length == 0) {
      //return not found referralcode
      console.log("account not found 1", reverseString(referralCodeFrom))
      return;
    }
    const data = {
      addressFrom: reverseString(referralCodeFrom),
      addressTo: account,
      referralCode: referralCodeFrom,
      referralAt: formatDate(new Date()),
    }
    if(checkAccountExist?.account?.length > 0) {
      console.log("start create Referral")
      try {
        await createReferral({
          variables: {
            data,
            id: checkAccountExist?.account[0].id,
            dataStatus: {
              statusReferral: true
            }
          }
        })
        setIsHide(true);
      } catch(err) {
        console.log(err)
      }
  }
  }
  return (
    <ModalContainer minWidth="365px" position="relative" >
      <ModalHeaders>
        <ModalTitle>
         <Wrapper>
            <Image src="/images/users-cog-solid.svg" height="20px" width="20px" />
            <Heading ml="5px" color="rgb(40, 13, 95)">
                Refferal
            </Heading>
         </Wrapper>   
        </ModalTitle>
        <Boxer onClick={onClose}>
        <ModalCloseButton onDismiss={onDismiss}/>
        </Boxer>
      </ModalHeaders>
      <WrapperBoder>
          <ButtonMenus activeIndex={index} onItemClick={handleClickMenu} variant="subtle" scale="sm" >
            <ButtonMenuItem style={{fontSize: 13, padding:'0px 36px'}}>Your Referrals</ButtonMenuItem>
            <ButtonMenuItem style={{fontSize: 13, padding:'0px 36px'}}>Leaderboard</ButtonMenuItem>
          </ButtonMenus>
        </WrapperBoder>
      <ModalBody px="24px" pt="0px" pb="24px" overflowY="scroll" maxHeight="90vh" height="512px">  
        {index === 0 ?    
        <div>
            <Headinger>your Refferal code</Headinger>
            <Flex alignItems="center" justifyContent="space-between" mb="24px" mt="12px" position="relative">
                <Input id="referral-code" type="text" name='referral' value={referralCode} contentEditable="false" style={{marginRight: 10}} onChange={handleChange} />
                <Image src="/images/vectorpaint.png" height="20px" width="20px" style={{cursor:'pointer'}} onClick={handleCopy} />            
               {isCopied &&  <Flex id="copied" style={{
                  position: 'absolute',
                  top: -38,
                  right: 0,
                  textAlign: 'center',
                  backgroundColor: 'rgb(25, 19, 38)',
                  color: 'rgb(255, 255, 255)',
                  borderRadius: 16,
                  opacity: 0.7,
                  padding: '6px 15px'
                }}>
                  Copied!
                </Flex>}
            </Flex>
           {((yourAccount && yourAccount.account && yourAccount?.account[0]?.statusReferral) || isHide) ? "" :
            <>
              <Headinger>Enter Your friend's Referral Code</Headinger>
              <Flex alignItems="center" justifyContent="space-between" mb="24px" mt="12px" position="relative">
                  <Input id="referral-code-from" type="text" name='referral-from' value={referralCodeFrom} style={{marginRight: 10}} onChange={handleChange} />
                  <Button onClick={handleSendReferralCode}>
                    Send
                  </Button>                      
              </Flex>
            </>
           }
            <Headinger>your Refferals</Headinger>
                <table style={{width:'100%', borderRadius:7}}>
                  <thead>
                    <tr style={{ padding: '3px 4px 0px', fontSize: 12, textTransform: 'uppercase', borderBottom: '1px solid rgb(118, 69, 217)', fontWeight:'bold'}}>
                        <Tdcpn width="30%" style={{color:"rgb(80 0 255)"}} >Wallet</Tdcpn>
                        <Tdcpn width="20%" style={{color:"rgb(80 0 255)"}}>Bets</Tdcpn>
                        <Tdcpn style={{color:"rgb(80 0 255)"}}>volume(BNB)</Tdcpn>
                        <Tdcpn style={{color:"rgb(80 0 255)"}}>Revenue%1</Tdcpn>
                    </tr>
                  </thead>
                </table>
                <div style={{overflowY:'auto', height:108, width: (false) ? '100%' : '102%'}}>
                  <table style={{width:'100%', borderRadius:7}}>
                    <tbody>
                      {Array.from({length: 10}, (item, index) => (
                          <tr key={index} style={{ fontSize:10, padding: '3px 4px', boxShadow: '0px -1px 0px 0px rgb(14 14 44 / 40%) inset', borderRadius: 7}}>
                            <Tdcpn width="30%">Wallet</Tdcpn>
                            <Tdcpn width="20%">Bets</Tdcpn>
                            <Tdcpn>volume(BNB)</Tdcpn>
                            <Tdcpn>Revenue%1</Tdcpn>
                        </tr>
                      ))}          
                    </tbody>
                </table>
               </div>
        
            <Headinger>your payments</Headinger>
           
                 <table style={{width:'100%', borderRadius:7,}}>
                   <tbody>
                     <tr style={{ fontSize:12, padding: '3px 4px', borderBottom: '1px solid rgb(118, 69, 217)', fontWeight:'bold',textTransform:"uppercase"}}>
                        <Tdcpn width="50%" style={{color:"rgb(80 0 255)"}}>Date</Tdcpn>
                        <Tdcpn style={{color:"rgb(80 0 255)"}}>Amount</Tdcpn>
                        <Tdcpn style={{color:"rgb(80 0 255)"}}>Hash</Tdcpn>  
                    </tr>
                   </tbody>
                </table>
             
                <div style={{overflowY:'auto', height:108, width:  (false) ? '100%' : '102%'}}>
                  <table style={{width:'100%', borderRadius:7,}}>
                    <tbody>
                      {Array.from({length: 10}, (item, index) => (
                        <tr key={index} style={{ fontSize:10, padding: '3px 4px', boxShadow: '0px -1px 0px 0px rgb(14 14 44 / 40%) inset', borderRadius: 7}}>
                          <Tdcpn width="50%">Date</Tdcpn>
                          <Tdcpn>Amount</Tdcpn>
                          <Tdcpn>Hash</Tdcpn>  
                        </tr>
                      ))} 
                    </tbody>   
                  </table>
               </div>

            <Flex alignItems="start" justifyContent="space-between" mt="10px" >
                <Text>Total Revenue</Text>
                <Wrapper>
                  <Box style={{ textAlign: 'right' }}>
                      <Text>{`${(payout)} BNB`}</Text>
                  </Box>
                  <Image src="/images/bscicon.svg" />
                </Wrapper>
                </Flex>

                <Flex alignItems="start" justifyContent="space-between" >
                <Text>Total Paid</Text>
                <Wrapper>
                  <Box style={{ textAlign: 'right' }}>
                      <Text>{`${(payout)} BNB`}</Text>
                  </Box>
                  <Image src="/images/bscicon.svg" />
                </Wrapper>
                </Flex>

                <Flex alignItems="start" justifyContent="space-between" >
                <Text>Pending Balnce</Text>
                <Wrapper>
                  <Box style={{ textAlign: 'right', fontWeight:'bold' }}>
                      <Text>{`${(payout)} BNB`}</Text>
                  </Box>
                  <Image src="/images/bscicon.svg" />
                </Wrapper>
                </Flex>
        </div>
        :
            <div>
                <table style={{width:'100%', borderRadius:7, marginTop: 10}}>
                   <tbody>
                     <tr style={{ fontSize:12, padding: '3px 4px', borderBottom: '1px solid rgb(118, 69, 217)', fontWeight:'bold', textTransform:"uppercase"}}>
                        <Tdcpn  width="10%" style={{color:"rgb(80 0 255)"}}>Rank</Tdcpn>
                        <Tdcpn width="50%" style={{color:"rgb(80 0 255)"}}>Account</Tdcpn>
                        <Tdcpn  style={{color:"rgb(80 0 255)", textAlign:'right'}}>Paid</Tdcpn>  
                    </tr>
                   </tbody>
                </table>
             
                <div style={{overflowY:'auto', height:388, width:  (false) ? '100%' : '102%'}}>
                  <table style={{width:'100%', borderRadius:7,}}>
                    <tbody>
                      {Array.from({length: 10}, (item, index) => (
                        <tr key={index} style={{ fontSize:10, padding: '3px 4px', boxShadow: '0px -1px 0px 0px rgb(14 14 44 / 40%) inset', borderRadius: 7}}>
                          <Tdcpn  width="10%" style={{textAlign: 'center', verticalAlign: "middle !important"}}>#{index + 1}</Tdcpn>
                          <Tdcpn  width="50%">
                            <Flex flexDirection="row" justifyContent="space-between" mx="8px">
                                <Image src="https://candlegenie.io/images/profileplaceholder.jpg" width="36px" height="36px" style={{ background: 'linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)', borderRadius: '50%', padding:2}}/>
                               <Flex flexDirection="column" >
                                  <a href="https://bscscan.com/address/0x078bb52f3fd53cde7ab15fe831da9b55e3c702fa" target="_blank" rel="noopener noreferrer">
                                  <div style={{color: 'rgb(251, 179, 9)',cursor: 'pointer', marginLeft: 8, marginBottom: 4, verticalAlign: 'middle', fontSize: 13, textAlign: 'left'}}>shibanova_dev</div>
                                  </a>
                                  
                                    <div color="textSubtle" font-size="11px" style={{color: 'rgb(122, 110, 170)',fontWeight: 400, lineHeight: 1.5, marginLeft: 8,  fontSize: 11}}>Public</div>
                               </Flex>
                            </Flex>                          
                          </Tdcpn>
                          <Tdcpn style={{ textAlign:'right', verticalAlign: "middle !important", fontWeight:'bold'}}>0.00{index+1} BNB</Tdcpn>  
                        </tr>
                      ))} 
                    </tbody>   
                  </table>
               </div> 

               <Flex alignItems="start" justifyContent="space-between" mt="10px" >
                <Text>Distributed Payments</Text>
                <Wrapper>
                  <Box style={{ textAlign: 'right' }}>
                      <Text>{`${(payout)} BNB`}</Text>
                  </Box>
                  <Image src="/images/bscicon.svg" />
                </Wrapper>
                </Flex>
            </div>    
        }
      </ModalBody>
    </ModalContainer>
  )
}

export default Referral
