import './contact.css';
function Contact(){

    return (
        <div className='contact-box'>
            <form className='form-container'>
                <h1 className='title'> Contact Us </h1>
                <input type="text" placeholder="Name"/>
                <br/>
                <input type="email" placeholder="Email"/>
                <br/>
                <input type="text" placeholder="Message"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}
export default Contact;