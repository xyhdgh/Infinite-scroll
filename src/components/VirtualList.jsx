import React from 'react'
import VirtualizedList from '@dwqs/react-virtual-list'
import { useState } from 'react'

const VirtualList = (props) => {
  const { list } = props
  const [hasMore, setHasMore] = useState(true)
  const renderItem = ({index, isScrolling}) => {
    console.log(index, isScrolling)
    const item = list[index]
    return (
      <div>{index}-{item}</div>
    )
  }
  const loadMoreItems = () => {
    if (list.length > 50) {
      setHasMore(false)
    }

  }
  return (
    <VirtualizedList renderItem={() => renderItem(0, true)} itemCount={10} onLoading={() => (<h4>Loading...</h4>)} hasMore={hasMore} estimatedItemHeight={30}
      loadMoreItems={loadMoreItems} useWindow={false} scrollableTarget={"box"}></VirtualizedList>
  )
}

export default VirtualList
