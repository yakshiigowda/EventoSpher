import React,{useState,useEffect} from "react";
import './style.css'
const CounterState=()=>{
    const[count,setCount]=useState(0)
    const increment=()=>setCount(count+1);
    const reset=()=>setCount(0)
    //  useEffect(()=>{
    //     console.log('count changed :${count)')
    //     document.title=`count:${count}`;
    //  },[count])
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(data=>console.log(data[0]));
    },[])


//     fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ name: 'Alice' }),
// });

    return(
        <div><h2>count:{count}</h2>
        <button onClick={increment}> increment </button>
        <button onClick={reset}>reset</button>
        </div>
    )
}
export default   CounterState
