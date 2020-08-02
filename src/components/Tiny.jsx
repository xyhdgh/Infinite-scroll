import React from 'react'
import VirtualList from 'react-tiny-virtual-list'
import { useState } from 'react'
import Loading from './Loading'
import { useEffect, useRef } from 'react'

const Tiny = () => {
  const [data, setData] = useState(new Array(25).fill(1).map((item, index) => index + 1))
  const clientHeight = document.documentElement.clientHeight
  const [isLoading, setIsLoading] = useState(false)
  const [tip, setTip] = useState("Loading...")
  let timer;
  let boxRef = useRef()
  const renderItem = ({index, style}) => {
    return (
      <div key={index} style={style}>
        Letter: {data[index]}, Row: #{index}
      </div>
    )
  }
  const handleScroll = (scrollTop) => {
    // 触底
    if (scrollTop + clientHeight === boxRef.current.children[0].children[0].scrollHeight) {
      setIsLoading(true)
      timer = setTimeout(() => {
        setIsLoading(false)
        if (data.length < 100) {
          setData(data.concat(new Array(25).fill(1).map((item, index) => index + 1)))
        } else {
          // 没数据了
          setTip('没数据了...')
        }
      }, 1000)
    }
  }
  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])
  return (
    <div ref={boxRef}>
      <VirtualList
        height={667}
        itemCount={data.length}
        renderItem={renderItem}
        itemSize={(index) => index + 50}
        onScroll={handleScroll}/>
      {isLoading ? <Loading tip={tip}/> : null}
    </div>
  )
}

export default Tiny
