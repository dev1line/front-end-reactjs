import React from 'react'
import { Box, Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Bet, HistoryFilter, State } from 'state/types'
import HistoricalBet from './HistoricalBet'
import { useSelector } from 'react-redux'
import { useGetHistoryFilter } from 'state/hooks'

interface RoundsTabProps {
  hasBetHistory: boolean
  bets: Bet[]
}

const RoundsTab: React.FC<RoundsTabProps> = ({ hasBetHistory, bets }) => {
  const { t } = useTranslation()
  const historyFilter = useGetHistoryFilter()
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
  return getDataFilter(histories, historyFilter)?.length > 0 ? (
    <>
      {getDataFilter(histories, historyFilter)?.map((bets, index) => (
        <HistoricalBet key={index} bet={bets} />
      ))}    
    </>
  ) : (
    <Box p="24px">
      <Heading size="lg" textAlign="center" mb="8px">
        {t('Không có lịch sử giao dịch')}
      </Heading>
      <Text as="p" textAlign="center">
        {t(
          'Nếu bạn chắc chắn mình sẽ thấy lịch sử ở đây, hãy đảm bảo rằng bạn đã kết nối với đúng ví và thử lại.',
        )}
      </Text>
    </Box>
  )
}

export default RoundsTab
