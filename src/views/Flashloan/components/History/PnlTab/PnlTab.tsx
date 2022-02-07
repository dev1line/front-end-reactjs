import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Box, Flex, Heading, Text, Button, Link, OpenNewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Bet, HistoryFilter, State } from 'state/types'
import { formatBnb } from 'views/Flashloan/helpers'

import PnlChart from './PnlChart'
import { useSelector } from 'react-redux'

interface PnlTabProps {
  hasBetHistory: boolean
  bets: Bet[]
}


const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 24px auto;
  width: 100%;
`


const PnlTab: React.FC<PnlTabProps> = ({ hasBetHistory, bets }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const histories = useSelector((state: State) => state.Flashloan.history)
  const getDataFilter = (histories, cond) => {
    switch(cond) {
      case HistoryFilter.ALL: {
        return histories;
      }
      case HistoryFilter.SUCESS: {
        return histories.filter((tx) => parseInt(tx.profit) > 0);
      }
      case HistoryFilter.FAIL: {
        return histories.filter((tx) => !(parseInt(tx.profit) > 0));
      }
    }
  }
  let caculateProfit = 0;
  const arr = histories.filter(i => parseInt(i.profit) > 0).map(i => parseInt(i.profit)).map(item => {
    caculateProfit = caculateProfit + parseInt(item);
    return item;
  })

  console.log("caculateProfit",arr)
  return true ? (
    <Box p="16px">
      <Text bold fontSize="24px" color="secondary" pb="24px">
        {t('Your history')}
      </Text>
      <Flex>
        <PnlChart lost={getDataFilter(histories, HistoryFilter.FAIL)?.length} won={getDataFilter(histories,  HistoryFilter.SUCESS)?.length} />
        <Flex flexDirection="column" justifyContent="center" pl="24px">
          <Text bold color="textSubtle">
            {t('Net results')}
          </Text>
          <Text bold fontSize="24px" lineHeight="1" color={true ? 'success' : 'failure'}>
            {`${caculateProfit > 0 ? '+' : ''}${formatBnb(caculateProfit)} $`}
          </Text>
          <Text small color="textSubtle">

          </Text>
        </Flex>
      </Flex>
      <Box pl="8px">
        <Text mt="24px" bold color="textSubtle">
          {t('Average return / transaction')}
        </Text>
        <Text bold color={true ? 'success' : 'failure'}>
          {`${true ? '+' : ''}${formatBnb(caculateProfit/arr.length)} $`}
        </Text>
        <Text small color="textSubtle">

        </Text>


          <>
            <Text mt="16px" bold color="textSubtle">
              {t('Best transaction')}
            </Text>
            <Flex alignItems="flex-end">
              <Text bold color="success">{`+${formatBnb(Math.max(...arr))} $`}</Text>
            </Flex>
            <Text small color="textSubtle">

            </Text>
          </>
  

        <Text mt="16px" bold color="textSubtle">
          {t('Least profit transaction')}
        </Text>
        <Text bold>{`${formatBnb(Math.min(...arr))} $`}</Text>
        <Text small color="textSubtle">
        
        </Text>
        <Divider />

        <Flex justifyContent="center" mt="24px">
          <Link href={`https://kovan.etherscan.io/address/${account}`} mb="16px" external>
            <Button mt="8px" width="100%">
              {t('View Reclaimed & Won')}
              <OpenNewIcon color="white" ml="4px" />
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  ) : (
    <Box p="24px">
      <Heading size="lg" textAlign="center" mb="8px">
        {t('No transaction history available')}
      </Heading>
      <Text as="p" textAlign="center">
        {t(
          'If you are sure you should see history here, make sure you’re connected to the correct wallet and try again.',
        )}
      </Text>
    </Box>
  )
}

export default PnlTab
