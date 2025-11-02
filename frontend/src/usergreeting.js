import './style.css';
import Login from './login'
function usergreeting(props){
//     if (props.isloggedin){
//     // return <div>
//     //     <h1 className='font_color'>
//     //      {props.username}</h1>
//     //     <p className='parag'>welcome to the {props.healthcare} app</p>
//     //     </div>
//     // }
//     // else{
//     //     return <h1 className='font_color'>please login to countnue</h1>
//     // }
// }
return props.isloggedin? (
    <div>
        <h1 className='font_color'>
         {props.username}</h1>
        <p className='parag'>welcome to the {props.healthcare} app</p>
        </div>
):(
    // <h1 className='font_color'>please login to countnue</h1>
    <Login/>
)
}
export default usergreeting; 
