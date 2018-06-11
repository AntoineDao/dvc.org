import React from 'react'
import styled from 'styled-components'
import { media, container } from '../styles'

export default ({}) => (
  <FeaturesHero>
    <Heading>
      DVC brings agility, reproducibility, and collaboration into your existing
      data science workflow
    </Heading>
  </FeaturesHero>
)

const FeaturesHero = styled.div`
  padding-top: 87px;
  padding-bottom: 58px;
  overflow: hidden;
`

const Heading = styled.h1`
  margin: 0px auto;
  max-width: 610px;
  min-height: 185px;
  font-size: 40px;
  font-family: "BrandonGrotesqueMed";
  line-height: 1.4;
  text-align: center;
  color: #40364d;
`
