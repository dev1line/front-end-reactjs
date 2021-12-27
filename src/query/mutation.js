import { gql } from '@apollo/client'

export const CREATE_HISTORY = gql`
  mutation ($history: HistoryCreateInput) {
    createHistory(data: $history) {
      id
    }
  }
`

export const CREATE_ACCOUNT = gql`
  mutation ($account: CustomerCreateInput) {
    createCustomer(data: $account) {
      id
    }
  }
`

export const CREATE_REFERRAL = gql`
  mutation ($data: ReferralCreateInput, $id: ID!, $dataStatus: CustomerUpdateInput) {
    createReferral(data: $data) {
      id
    }
    updateCustomer(id: $id, data: $dataStatus) {
      id
    }
  }
`
export const UPDATE_PROFILE = gql`
  mutation ($id: ID!, $data: CustomerUpdateInput) {
    updateCustomer(id: $id, data: $data) {
      id
    }
  }
`
