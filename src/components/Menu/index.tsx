import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { Menu as UikitMenu, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useSelector } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config'
import Referral from './Referral'
import Profile from './Profile'
import $ from 'jquery';
import styled from 'styled-components'
import useAuth from 'hooks/useAuth'
import { ethers, Wallet, Contract } from "ethers";
import contractDefinition from "../../config/abi/FlashloanMoneyLego.json"
import { useAppDispatch } from 'state'
import { State } from '../../state/types'
import { setContract } from 'state/Flashloan'
import { ApolloProvider, useMutation, useQuery } from '@apollo/client'
import { CHECK_ACCOUNT } from 'query/general'
import { CREATE_ACCOUNT } from 'query/mutation'
import { client } from 'apolo-client'
import { SERVER_API } from 'apolo-client/config'

declare let window: any;
const Boxer = styled.div`
& > div > nav > div:first-child > a {
    display: none;
  }
`
const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [imgLink, setImgLink] = useState({})
  // let profile;
  const dispatch = useAppDispatch()
  const abi = useSelector((state: State) => state.Flashloan.contract.abi)
  console.log("account web3", account)
  const {
    loading: fetching,  
    error,
    data: checkAccountExist = {},
    refetch,
  } = useQuery(CHECK_ACCOUNT, {
    variables: {
        sender: account || ""
    },
    onCompleted: (data) => {
      console.log(data)
      setImgLink(data.account[0].avatar.original);
    },
  });
  // console.log("OK to create out", checkAccountExist && checkAccountExist.account && checkAccountExist.account[0].avatar.original)   
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  useEffect(() => {
    // if(!!checkAccountExist && checkAccountExist.account && checkAccountExist.account.length > 0) {
    //  const imgLink = `${SERVER_API}` + checkAccountExist.account[0].avatar.original;
    //   console.log("profile", imgLink)
    // }

  const runner = async () => {
    if(!checkAccountExist && !!account) {
      console.log("OK to create", checkAccountExist)     
     try {
      await createAccount({
        variables: {
          account: {
            address: account,
            nickname: 'noname',
            referralCode: reverseString(account)
          } 
        }
      })
     } catch (err) {
       console.log(err)
     }
    }
   }
   runner();
  }, [checkAccountExist])
  useEffect(() => {
    async function runer() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer, account;
      const kovan = {
        name: "kovan",
        networkID: "42",
        erc20: {
          dai: {
            address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
          },
        },
      };
      const contractFlashloanMoneyLegoAddress =
        contractDefinition.networks[kovan.networkID].address;
      try {
        // Prompt user for account connections
        account = await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
      } catch (err) {
        console.log(err);
      }
      if (signer && (await signer.getAddress())) {
     
        dispatch(setContract({
          address: contractFlashloanMoneyLegoAddress,
          abi:  contractDefinition.abi,
          provider
        }));


      } else {
        //handle log fail connect
        // console.log("logger:", contractDefinition.abi);
      }
    }
    runer();
       //check account exist in cms
       const data = refetch({
        sender: account
      });
      // console.log("checkAccountExist in ", checkAccountExist, data);
  }, [account])
  const handleClose = () => {
    close();
  }
  const [onpresentReferral, close] = useModal(
    <ApolloProvider client={client}>
    <Referral payout={100} roundId={"okok"} epoch={1} onClose={handleClose}/>
    </ApolloProvider>,
    false,
  )
  useEffect(() => {
    $("#aaa > div > div:last-child  > div:first-child > div:last-child > div:first-child").css("display", "none")
    $("#aaa > div > div:last-child  > div:first-child > div:first-child > div:nth-child(6)").click(() => {
      onpresentReferral()
    })
    $("#aaa > div >  nav:first-child > div:last-child > div:last-child").click(() => {
      onpresentProfile()
    })
  },[]);
  function reverseString(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join(""); 
    return joinArray; 
  }
  const { currentLanguage, setLanguage, t } = useTranslation()

 

  const [onpresentProfile] = useModal(
    <Profile payout={100} roundId={"okok"} epoch={1} />,
    false,
  )
  
  useEffect(() => {
    const Imag = () => `<img src="images/icon.ico" id="imgLogo" />`

    $("body").append(`<style>
      #imgLogo {
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        outline: none;
        padding:10px;
      }  
      #txtLg {
        align-self: center;
        font-size: 22px;
        font-weight: bold;
        color: #7e7d88;
      }
      #F_word {
        color: red;
      }
    </style>`)
   $("#aaa > div > nav > div:first-child ").append(Imag)
   $("#aaa > div > nav > div:first-child ").append(`<p id="txtLg" >IT<span id="F_word">F</span>loan</p>`)

  },[]);

  return (  
    <Boxer id="aaa">
      <UikitMenu
          account={account}
          login={login}
          logout={logout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentLang={currentLanguage.code}
          langs={languageList}
          setLang={setLanguage}
          cakePriceUsd={12.09}
          links={config(t)}
          profile={{
            username: "yourname",
            image: "",
            profileLink: "/profile",
            noProfileLink: "/profile",
            showPip: true
          }}
          {...props}
        />
    </Boxer>
  );
}
export default Menu
