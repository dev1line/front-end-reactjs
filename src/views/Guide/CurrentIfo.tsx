import React from 'react'
import { GuideConfig } from 'config/constants'
import IfoLayout from './components/IfoLayout'
import Guideteps from './components/Guideteps'
import IfoQuestions from './components/IfoQuestions'

const activeIfo = GuideConfig.find((ifo) => ifo.isActive)

const Ifo = () => {

  return (
    <IfoLayout>
      <Guideteps ifo={activeIfo} />
      <IfoQuestions />
    </IfoLayout>
  )
}

export default Ifo
