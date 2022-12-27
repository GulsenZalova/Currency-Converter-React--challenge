import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [data,setData]=useState({})

const [option,setOption]=useState()
const [convert,setConvert]=useState()
const [amount,setAmount]=useState(1)
const [amountFrom,setAmountFrom]=useState(true)
const [exchange,setExchange]=useState()


let toAmount
let fromAmount

if (amountFrom) {
  fromAmount=amount
  toAmount=amount * exchange
}else{
  toAmount=amount
  fromAmount=amount / exchange
}

 const getData=()=>{
  fetch("https://api.freecurrencyapi.com/v1/latest?apikey=Vv3faJNSZNeBqRsrNs9aZ0LwxPt6lzO72MDmvkwb")
  .then((res)=>res.json())
  .then((info)=>{
    setData(info.data)
    setOption(Object.keys(info.data)[0])
    setConvert(Object.keys(info.data)[1])
    setExchange(info.data[option])
  })
 }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    fetch("https://api.freecurrencyapi.com/v1/latest?apikey=Vv3faJNSZNeBqRsrNs9aZ0LwxPt6lzO72MDmvkwb")
    .then((res)=>res.json())
    .then((info)=>setExchange(info.data[convert]))
  },[option,convert])

  const fromConvert=(e)=>{
    setAmount(e.target.value)
    setAmountFrom(true)
  }


  const toConvert=(e)=>{
    setAmount(e.target.value)
    setAmountFrom(false)
  }

  return ( 
  <div className='container'>
    <div className='wrapper'>
    <div className='from'>
    <input type="number" min={1} onChange={fromConvert}  value={fromAmount}/>
<select name="option" id="option"  value={option} onChange={(e)=>setOption(e.target.value)}  >
{
    Object.keys(data).map((x)=>(
      <option key={x} value={x}>{x}</option>
    ))
  }
</select>
    </div>

<div className='to'>
<input type="number" min={1} onChange={toConvert} value={toAmount} />
<select name="convert" id="convert" value={convert}  onChange={(e)=>setConvert(e.target.value)}  >
{
    Object.keys(data).map((x)=>(
      <option key={x} value={x}>{x}</option>
    ))
  }
</select> 
</div>
  
    </div>
  </div>
  )
}

export default App

