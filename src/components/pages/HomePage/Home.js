import React from 'react'
import HomeSection from './HomeSection'
import {homePoqatch,homePoquedex,homePoquet} from './Data'

function Home() {
    return (
        <>
          <HomeSection {...homePoqatch}/>
          <HomeSection {...homePoquedex}/>
          <HomeSection {...homePoquet}/>
        </>
    )
}
export default Home
