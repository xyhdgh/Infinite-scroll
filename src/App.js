import React from 'react';
import './App.css';
// import List from './components/List.jsx'
// import VirtualList from './components/VirtualList.jsx'
// import Loading from './components/Loading.jsx'
// import Header from './views/Header'
// import Footer from './views/Footer'
// import Container from './views/Container'
import './rem'
import Tiny from './components/Tiny'

function App() {
  // const [isLoading, setIsLoading] = useState(false)
  // const [list, setList] = useState([])
  // useEffect(() => {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000)
  // }, [])
  return (
    <div className="App" style={{display: "flex", flexDirection: "column", width: "100vw", height: "100vh"}}>
      {/* <List />
      <div style={{width: '320px', height: '568px', margin: '100px auto', position: 'relative', border: "1px solid red"}} id="box">
        {isLoading ? <Loading list={list} /> : <VirtualList list={list}/>}
      </div> */}
      {/* <Header />
      <Container />
      <Footer /> */}
      <Tiny />
    </div>
  );
}

export default App;
