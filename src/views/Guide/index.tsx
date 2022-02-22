import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'

const Guide = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Hero title="Hướng dẫn sử dụng flashloans" sub_title='Hướng dẫn chi tiết theo từng bước cụ thể' />
        <Container>     
            <Route exact path={`${path}`}>
              <CurrentIfo />
            </Route>
          </Container>
    </>
  )
}

export default Guide
