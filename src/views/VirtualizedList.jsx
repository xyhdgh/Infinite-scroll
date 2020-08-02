import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Item from '../components/Item.jsx'

const VirtualizedList = ({ conHeight, conRef }) => {
  const [startOffSet, setStartOffSet] = useState(0) // 可视区域的第一个元素到最上面的元素距离
  const [endOffSet, setEndOffSet] = useState(0) // 可视区域的最后一个元素到最下面元素的距离
  const [visibleData, setVisibleData] = useState([]) // 可视区域的数组 
  let startIndex = 0;
  let endIndex = 0;
  let scrollTop = 0;
  // 假设 列表长度一定 每个数据项高度一定
  const itemHeight = 60;
  const dataList = Array.from({length: 100}).fill('list')
  // 计算初始化渲染多少数据
  let visibleCount = Math.ceil(conHeight / itemHeight) // 10
  // 缓存已渲染元素的位置信息
  let cache = []
  // 定义变量缓存可视区域第一个元素的位置
  let anchorItem = {
    index: 0, // 锚点元素的索引值
    top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
    bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
  }
  // 列表项渲染完后 储存渲染元素位置信息
  const cachePosition = (node, index) => {
    const rect = node.getBoundingClientRect()
    const HtmlFontSize = parseFloat(document.documentElement.style.fontSize)
    const top = rect.top + conRef.current.scrollTop - HtmlFontSize * 0.5
    cache.push({
      index,
      top,
      bottom: top + itemHeight
    })
  }
  // 滑动方法
  const handleScroll = (e) => {
    // 获取滑动的top
    let scroll_top = e.target.scrollTop
    if (scroll_top > scrollTop) {
      // 滚动过了当前第一个元素的底部 向下滑动
      if (scroll_top > anchorItem.bottom) {
        console.log('cache::', cache)
        updateBoundaryIndex(scroll_top)
        setVisibleData(dataList.slice(startIndex, endIndex + 1))
        setStartOffSet(anchorItem.top)
        setEndOffSet((dataList.length - endIndex) * itemHeight)
      }
    } else if (scroll_top < scrollTop) { // 向上滑动 超过了第一个元素顶部
      if (scroll_top < anchorItem.top) {
        updateBoundaryIndex(scroll_top)
        setVisibleData(dataList.slice(startIndex, endIndex + 1))
        setStartOffSet(anchorItem.top)
        setEndOffSet((dataList.length - endIndex) * itemHeight)
      }
    }
    scrollTop = scroll_top
  }
  // 计算startIndex和endIndex值
  const updateBoundaryIndex = (scroll_top) => {
    scroll_top = scroll_top || 0
    const anchor_item = cache.find(item => item.bottom >= scroll_top)
    // console.log('cache::', cache)
    console.log('scroll_top::', scroll_top)
    // console.log('anchor_item::', anchor_item)
    if (!anchorItem) {
      return
    }
    anchorItem = {...anchor_item}
    startIndex = anchorItem.index
    endIndex = startIndex + visibleCount
  }
  useEffect(() => {
    // 计算初次渲染的偏移量以及可视区域上下的索引
    let end = (dataList.length - visibleCount) * itemHeight;
    setStartOffSet(anchorItem.top)
    setEndOffSet(end)
    endIndex = startIndex + visibleCount
    setVisibleData(dataList.slice(startIndex, endIndex))
    conRef.current.addEventListener('scroll', handleScroll, false)
    return () => {
      conRef.current.removeEventListener('scroll', handleScroll, false)
    }
  }, [conHeight])
  return (
    <div style={{paddingTop: `${startOffSet / 100}rem`, paddingBottom: `${endOffSet / 100}rem`}}>
      {visibleData.map((data, index) => {
        return <Item key={index} cachePosition={cachePosition} data={data} index={index + startIndex}/>
      })}
    </div>
  )
}

export default VirtualizedList
