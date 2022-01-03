import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'

const Guide = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Hero title="Guide to using flashloans" sub_title='All functions need to handle step by step' />
        <Container>     
            <Route exact path={`${path}`}>
              <CurrentIfo />
            </Route>
          </Container>
    </>
  )
}

export default Guide
