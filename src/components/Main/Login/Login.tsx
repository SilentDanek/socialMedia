

export function Login (){
    return (
        <div>
            Login
            <br/>
            <label htmlFor={"emailInput"}>Email</label>
            <input type={"email"} id={"emailInput"}/>
            <br/>
            <label htmlFor={"textInput"}>login</label>
            <input type={"text"} id={"textInput"}/>
            <br/>
            <label htmlFor={"passwordInput"}>password</label>
            <input type={"password"} id={"passwordInput"}/>
        </div>
    )
}