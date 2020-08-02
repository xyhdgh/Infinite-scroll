import React, { useRef } from 'react'
import containerStyle from '../style/container.module.css'
import VirtualizedList from './VirtualizedList'

const Container = () => {
  const conRef = useRef()
  const conHeight = conRef.current?.offsetHeight
  return (
    <div className={containerStyle.container} ref={conRef}>
      <VirtualizedList conHeight={conHeight} conRef={conRef} />
    </div>
  )
}

export default Container
