import React, {useEffect, useState} from 'react'
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
  Checkbox,
  Input,
  Button,
  ModalCloseButton,
} from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import { upload } from 'utils/upload'
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from 'query/mutation'
import {GET_YOUR_ACCOUNT} from 'query/general'
import { SERVER_API } from 'apolo-client/config'
import { useWeb3React } from '@web3-react/core'
interface CollectRoundWinningsModalProps extends InjectedModalProps {
  payout: number
  roundId: string
  epoch: number
  onSuccess?: () => Promise<void>
  onDismiss?:() => void
  onClose: () => void
}

const Wrapper = styled.div`
    display: flex;
    justify-content:space-around;
    align-items:center;
`
const Image = styled.img`
    margin: 0px;

`
const ModalHeaders = styled(ModalHeader)`
    background: linear-gradient(139.73deg , rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
`
const Boxer = styled.div`
 & > button > svg {
   fill:rgb(40, 13, 95);
 }
`
const Info: React.FC<CollectRoundWinningsModalProps> = ({
  payout,
  roundId,
  epoch,
  onDismiss,
  onSuccess,
  onClose
}) => {
  const [avatar,setAvatar] = useState({picture:"", src:""});
  const [nickname, setNickname] = useState("WuanSan");
  const handleChange = (e) => {
    e.preventDefault();
      setNickname(e.target.value);
  }
  const [media, setMedia] = useState("");
  const {account} = useWeb3React();
  const { toastError, toastSuccess, toastWarning } = useToast()
 
  const { loading: fetching,  
    error,
    data: yourProfile = {},
    refetch } = useQuery( GET_YOUR_ACCOUNT, {
      variables: {
        sender: account || ""
      }
    });
  
    useEffect(() => {
      refetch();
    }, [refetch, account]);

    useEffect(() => {
      yourProfile &&  yourProfile.account && setNickname(yourProfile.account[0]?.nickname);
    }, [yourProfile]);
    yourProfile &&  yourProfile.account && console.log("Your profile", yourProfile, yourProfile.account[0]?.avatar?.original)
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const handleChangeAvatar = () => {
    document.getElementById("lb-upload").click();
  }
  const handleChangeSelect = (e) => {
    var picture = e.target.files[0];
    var src     = URL.createObjectURL(picture);
    setAvatar({
      picture,
      src
    })
    let file = e.target.files[0];

    if (!file || !e.target?.validity?.valid) return;
    if (file.size > 10000000) {
      toastWarning("Image size is too big !")
      // return;
    }
    if (file.name.includes(".svg") === true) {
      toastWarning("Extension file is .svg not support !")
      return;
    }

    setMedia(file);

  }

  const onSubmit = async () => {
    if (media) {
      let rs = undefined;
      try {
        rs = media && (await upload(media));
      } catch (error: any) {
          rs = undefined;
          toastError("Upload image is Fail !")
      }  

      if(!error && !fetching && yourProfile && rs) {
        updateProfile({
          variables: {
            data: {
              avatar: {
                create: {
                  filename: rs.filename,
                  originalFilename: rs.originalname,
                  publicUrl: rs.publicUrl,
                }
              }
            },
            id: yourProfile?.account[0]?.id
          },
        });
        toastSuccess("Update Profile successfully")
      }  
    }

    if(yourProfile && yourProfile.account && nickname !== yourProfile.account[0]?.nickname ) {
      updateProfile({
        variables: {
          data: {
            nickname
          },
          id: yourProfile?.account[0]?.id
        },
      });
      toastSuccess("Update Profile successfully")
    }

  };
  return (
    <ModalContainer minWidth="288px" position="relative" >
      <ModalHeaders>
        <ModalTitle>
         <Wrapper>
            <Image src="/images/users-cog-solid.svg" height="20px" width="20px" />
            <Heading ml="5px" color="rgb(40, 13, 95)">
               Profile
            </Heading>
         </Wrapper>   
        </ModalTitle>
    <Boxer onClick={onClose}>
        <ModalCloseButton onDismiss={onDismiss}/>
    </Boxer>
      </ModalHeaders>
      <ModalBody p="24px" maxHeight="90vh">
            <Flex flexDirection="column" justifyContent="space-around" alignItems="center">
                <Heading style={{    
                    color: 'rgb(118, 69, 217)',
                    lineHeight: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 8,
                    fontSize: 12,
                    fontWeight: 'bold'}}>Profile Picture</Heading>
           
                <Image src={ avatar.picture ? avatar.src : (( yourProfile &&  yourProfile.account && yourProfile?.account[0]?.avatar?.original) ? SERVER_API + yourProfile?.account[0]?.avatar?.original : "https://candlegenie.io/images/profileplaceholder.jpg")}  style={{ background: 'linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)', borderRadius: '50%', padding:2, width:"100px", height:"100px"}}/>
                
                <Text style={{
                    color: 'rgb(118, 69, 217)',
                    cursor: 'pointer',
                    verticalAlign: 'middle',
                    fontSize: 11,
                    fontWeight: 600,
                }} onClick={handleChangeAvatar} >CHANGE</Text>     
                 <input type="file" id="file-uploader" onChange={handleChangeSelect} style={{visibility:'hidden'}} />
                 <label id="lb-upload" htmlFor="file-uploader"  style={{visibility:'hidden'}}></label>
                <Flex flexDirection="column">
                    <Flex flexDirection="column">
                        <Heading style={{
                            color: 'rgb(118, 69, 217)',
                            lineHeight: 1.5,
                            textTransform: 'uppercase',
                            marginBottom: 5,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }}>Nick Name</Heading>
                        <Input type="text" value={nickname} onChange={handleChange} />
                        <Flex mt="20px" mb="88px" style={{visibility:'hidden'}}>
                            <Checkbox scale="sm" />
                            <Text style={{marginLeft: 5}}>Hide me from the leaderboards</Text>
                        </Flex>
                    </Flex>
                    <Button
                        width="100%"
                        mb="8px"
                        style={{ backgroundColor: 'rgb(251, 179, 9)', height:35}}
                       onClick={onSubmit}
                    >
                      <Boxer onClick={onClose}>
                        Save Changes
                      </Boxer>
                    </Button>
                </Flex>
            </Flex>
      </ModalBody>
    </ModalContainer>
  )
}

export default Info;
