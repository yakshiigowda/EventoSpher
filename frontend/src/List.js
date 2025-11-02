// import './style.css'
// function List(){
//    const fruits=['apple','orange','banana','grape'];
//    return (
//     <div>
//         <h1 className='login-head'>fruits</h1>
//         <ul className='login-element'>
//         {fruits.map((fruit,index)=>(
//             <tr>{index+1}.{fruit}</tr>
//         ))}
//             </ul>
//     </div>
//    );
// }
// export default List;


import './style.css'
function List(){
   const fruits=['apple','orange','banana','grape'];
   const list_fruits=fruits.map(fruit => <li className='login-element'> {fruit}</li>)
   return (<div> <h1 className='login-head'>fruits lists</h1>
   <ol >{list_fruits}</ol> </div>)
}

export default List;