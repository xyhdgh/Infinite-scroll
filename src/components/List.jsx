import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const List = () => {
  const [dataList, setDataList] = useState(new Array(5).fill(1).map((item, index) => index + 1))
  const [hasMore, setHasMore] = useState(true)
  const fetchData = () => {
    if (dataList.length > 30) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      setDataList(dataList.concat(new Array(5).fill(1).map((item, index) => index + 1)))
    }, 500)
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={dataList.length}
        next={fetchData}
        loader={<h3>Loading...</h3>}
        hasMore={hasMore}
        height={400}
        style={{width: '200px', margin: '100px auto'}}>
          {dataList.map((item, index) => {
            return <div key={index} style={{height: "100px"}}>{item}</div>
          })}
        </InfiniteScroll>
    </div>
  )
}

export default List
