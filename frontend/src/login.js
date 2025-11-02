import './style.css'
function login(){
 // alert("please login to countnue")
  return <div>
  <h1 className='login-head'> Login</h1>
    <h2>
      <form  className='login-element'>
        <label> username </label>
        <input  type="text" placeholder= "username" />
        <br/>
        <label> password</label>
        <input type="password" placeholder="password"/>
        <br/>
        <button>submit</button>
      </form>
    </h2>
  </div>
}
export default login;

// we need to connect this login page to usergreeting 