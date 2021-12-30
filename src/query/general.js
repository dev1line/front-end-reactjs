import { gql } from '@apollo/client'

export const ALL_HISTORY = gql`
  query getHistoriesBySender($sender: String) {
    histories: allHistories(where: { sender: $sender }) {
      name
      history
      profit
      txhash
    }
  }
`
export const CHECK_ACCOUNT = gql`
  query checkAccountExist($sender: String) {
    account: allCustomers(where: { address: $sender }) {
      id
      address
      nickname
      referralCode
      avatar {
        original: publicUrl
        filename
      }
      statusReferral
    }
  }
`
export const GET_YOUR_ACCOUNT = gql`
  query getYourAccount($sender: String) {
    account: allCustomers(where: { address: $sender }) {
      id
      address
      nickname
      referralCode
      avatar {
        original: publicUrl
        filename
      }
      statusReferral
    }
  }
`
