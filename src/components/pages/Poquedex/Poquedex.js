import React from 'react'
import PoqueList from './PoqueList.js'

function Poquedex() {
  return (
    <>
      <PoqueList limitInput={10} offsetInput={0}/>
    </>
  )
}
export default Poquedex
