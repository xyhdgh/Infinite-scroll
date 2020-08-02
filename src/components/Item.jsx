import React from 'react'
import itemStyle from '../style/item.module.css'
import { useEffect, useRef } from 'react'

const Item = (props) => {
  const { cachePosition, data, index } = props
  const nodeRef = useRef()
  useEffect(() => {
    cachePosition(nodeRef.current, index)
  }, [])
  return (
    <div className={itemStyle.listItem} ref={nodeRef}>
      {data}
    </div>
  )
}

export default Item
