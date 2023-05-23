import {useState} from "react"
import { useNavigate,Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login = (props) => { 
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({
        email: null,
        password : null,
        backendError : null,
        noErrors : false
    })
    

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSuccess = (id) => {
        Cookies.set("my_token",`you are already logged in with ${id}`,{expires : 30})
        navigate(`/home/${id}`)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        if (email.length > 0) {
            if (email.includes("@") && email.includes(".com")) {
                const x = email.split("")
                const startIndex = x.findIndex(each => each === "@")
                const dotIndex = x.findIndex(each => each === ".")
                if (dotIndex - startIndex > 1){
                    setErrors(prev => ({
                        ...prev,
                        email : null
                    }))
                }else {
                    setErrors(prev => ({
                        ...prev,
                        email : "please enter a valid Email",
                        noErrors : false
                    }))
                }
            }else {
                setErrors(prev => ({
                    ...prev,
                    email : "please enter a valid Email",
                    noErrors : false

                }))
            }
        }else {
            setErrors(prev => ({
                ...prev,
                email : "please enter a valid Email",
                noErrors : false
            }))
        }
        if (password.length === 0) {
            setErrors(prev => ({
                ...prev,
                password : "this filed is required",
                noErrors : false
            }))
        }else {
            setErrors(prev => ({
                ...prev,
                password : null,
                noErrors : false
            }))
        }
        if (errors.email === null && errors.password === null) {
            setErrors(prev => ({
                ...prev,
                noErrors : true
            }))
        }else {
            setErrors(prev => ({
                ...prev,
                noErrors : false
            }))
        }
        if (errors.noErrors) {
            const {users} = props
            const isExistingUser = users.filter(each => each.email === email)
            if (isExistingUser.length > 0) {
                const {userPassword,id} = isExistingUser[0]
                const credentialCheck = password === userPassword
                if (credentialCheck) {
                    
                    onSubmitSuccess(id)
                }
                else {
                    setErrors(prev => ({
                        ...prev,
                        backendError : "Email & Password dosen't match"
                    }))
                }
            }
            else {
                setErrors(prev => ({
                    ...prev,
                    backendError : "User doesn't exist"
                }))
                
            }
        }
    }

    const onClickSignUp = () => {
        navigate("/signup")
    }

    const token = Cookies.get('my_token')
        if (token !== undefined) {
        return <Navigate to="/home" />
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center main-bg-contaier">
                <div className="d-flex flex-column justify-content-center align-items-center form-container">
                    <img src="https://media.licdn.com/dms/image/C560BAQE500N-c6yNHw/company-logo_200_200/0/1519902853807?e=2147483647&v=beta&t=iUz5_gPXa_wgfSrdhvvhAP_9c2i80WQpEFojFIVISpA" alt="logo" className="logo-image" />
                    <h4 className="text-center">LOGIN</h4>
                    
                    <form onSubmit={onSubmitForm}  className="d-flex flex-column user-form">
                        <label className="mt-3 label" htmlFor="email">EMAIL</label>
                        <input type="text" className="login-form-input" id="email" placeholder="EMAIL" onChange={onChangeEmail} value={email}/>
                        {errors.email && <p className="text-warning">*{errors.email}</p>}
                        <label className="mt-3 label" htmlFor="password">PASSWORD</label>
                        <input type="password" className="login-form-input" id="password" placeholder="PASSWORD" onChange={onChangePassword} value={password} />
                        {errors.password && <p className="text-warning">*{errors.password}</p>}
                        <button type="submit" className="btn btn-primary mt-3">Login</button>
                        {errors.backendError && <p className="text-warning">*{errors.backendError}</p>}
                    </form>
                    
                    <h5 className="sign-up-tag">Don't have account ? <span onClick={onClickSignUp} className="text-secondary sign-up" >sign up</span></h5>
                    <p>(or)</p>
                    <button type="submit" className="btn btn-primary google-button">Sign in with Google</button>
                    
                </div>
            </div>
    )
}
export default Login