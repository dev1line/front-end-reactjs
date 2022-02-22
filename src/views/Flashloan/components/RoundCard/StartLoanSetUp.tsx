import React, {useState} from 'react'
import styled from 'styled-components'
import { Box, Input, CardBody, Button , PlayCircleOutlineIcon, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Card from './Card'
import CardHeader from './CardHeader'
import ConfirmLoan from './ConfirmLoan'
import tokens from 'config/constants/tokens'
import { State, StatusBlock } from 'state/types'
import { setLoan, setReverseCoin, setSwiperList } from 'state/Flashloan' 
import { useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
const StyledStartLoanSetUp = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;

  &:hover {
    opacity: 1;
  }
`
interface PropsStart {
  block: any
}
const StartLoanSetUp: React.FC<PropsStart> = ({block}) => {
  const { t } = useTranslation()
  const loan = useSelector((state:State) => state.Flashloan.swiperList[0].loan)
  const [amount, setAmount] = useState(0)
  const swiperList = useSelector((state:State) => state.Flashloan.swiperList)
  const [isConfirm, setIsConfirm] = useState(false)
  const [reverse, setReverse] = useState(tokens[0])
  const dispatch = useAppDispatch()

  const handleChange = (e) => {
    setAmount(Math.abs(e.target.value));
  }
  const delZero = (num:string) => {
    const arr = num.split('');
    const index = arr.findIndex(a => a !== "0");
    return parseInt(num.slice(index));
  }
  const handleConfirm = (e, amount) => {

    setIsConfirm(true);
    const repl = typeof amount != "number" ? delZero(amount as string) : amount;

    setAmount(repl);
    if(!swiperList.find(i => i.type === StatusBlock.ADD_END)) {
      const data = {
        type: StatusBlock.ADD_END,
      }
      const pusher = swiperList.slice();
      pusher.push(data);
      dispatch(setSwiperList(pusher));
    }
    dispatch(setLoan(repl))
    close();
  }
  const [onPresentLoan, close] = useModal(
    <ConfirmLoan loan={loan} onConfirm={handleConfirm} token={reverse}/>,
    false,
  )
  const handleSelect = (e, item) => {
    setReverse(item);
    dispatch(setReverseCoin(item));
    const ExList = swiperList.map((ii, index) => {
      if(ii.type === StatusBlock.START) return {
        type: ii.type,
        loan: ii.loan,
        token: item
      };
      if(ii.type !== StatusBlock.EXCHANGE) return ii;
  return (ii?.refund) ?
         {
          type: ii.type,
          refund: ii.refund,
          tokenIn: ii.tokenIn,
          tokenOut : item,
          exchange: ii.exchange
        }
    : (index === 1) ?
       {
        type: ii.type,
        refund: ii.refund,
        tokenIn: item,
        tokenOut : ii.tokenOut,
        exchange: ii.exchange
      } : ii
    })
    dispatch(setSwiperList(ExList));

    close();
  }
  return (
    <Box position="relative">
      <StyledStartLoanSetUp>
        <CardHeader
          status="live"
          icon={<PlayCircleOutlineIcon mr="4px" width="21px" color="textDisabled" />}
          title={t('Flashloan')}
          epoch={0}
          hide={true}
          isExchange={false}
          handleSelect={handleSelect}
        />
        <CardBody p="16px" style={{ position: 'relative' }}>
            <Input id="referral-code" type="number" value={loan > 0 ? loan : amount} contentEditable="false" style={{marginRight: 10}} onChange={handleChange} disabled={true} />         
          {isConfirm ?
           <Button width="100%" mt="16px" onClick={onPresentLoan}>Adjust</Button>
          :
           <Button width="100%" mt="16px" onClick={onPresentLoan}>Loan</Button>
          }
           
        </CardBody>
      </StyledStartLoanSetUp>
    
    </Box>
  )
}

export default StartLoanSetUp
