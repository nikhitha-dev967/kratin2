import "./index.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom"
import {v4 as uuidv4} from "uuid"

const SignUp = (props) => {
    const navigate = useNavigate()
    const onClickLogin = () => {
        navigate("/")
    }
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfrimPassword] = useState("")
    const {setUsers,users} = props
    const [errors, setErrors] =  useState({
        email : "",
        password : "",
        firstName : "",
        lastName : "",
        confirmPassword : "",
        backendError : "",
        noErrors : ""
    })

    const onSubmitSuccess = () => {
            navigate("/")
        }

    const onSubmitForm =  (e) => {
        e.preventDefault()
        callFunction()
    }

    const callFunction = () => {
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
                        
                    }))
                }
            }else {
                setErrors(prev => ({
                    ...prev,
                    email : "please enter a valid Email",
                    

                }))
            }
        }else {
            setErrors(prev => ({
                ...prev,
                email : "please enter a valid Email",
                
            }))
        }
        if (password.length < 8) {
            if (password.length === 0){
            setErrors(prev => ({
                ...prev,
                password : "this filed is required",
                
            }))
            }else {
                setErrors(prev => ({
                    ...prev,
                    password : "password must be of atleast 8 characters",
                    noErrors : false
                }))
            }
        }else {
            setErrors(prev => ({
                ...prev,
                password : null,
                
            }))
        }
        if (firstName.length < 1) {
            setErrors(prev => ({
                ...prev,
                firstName : "this field is required",
                
            }))
        }else {
            setErrors(prev => ({
                ...prev,
                firstName : null
            }))
        }
        if (lastName.length < 1) {
            setErrors(prev => ({
                ...prev,
                lastName : "this field is required"
            }))
        }else {
            setErrors(prev => ({
                ...prev,
                lastName : null
            }))
        }
        if (confirmPassword !== password) {
            setErrors(prev => ({
                ...prev,
                confirmPassword : "password didn't match"
            }))
        }
        else if (confirmPassword === password && confirmPassword.length === 0) {
            setErrors(prev => ({
                ...prev,
                confirmPassword : "this field is required"
            }))
        }else {
            setErrors(prev => ({
                ...prev,
                confirmPassword : null
            }))
        }
        console.log(errors)
        if (errors.email === null && errors.password === null && errors.confirmPassword === null && errors.firstName === null && errors.lastName === null) {
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
        console.log(errors.noErrors)
        if (errors.noErrors) {
            console.log(firstName, lastName, email, password)
            const getUser = users.filter(each => each.email === email)
            if (getUser.length === 0) {
                const newUser = {id : uuidv4(),firstName,lastName,email,userPassword : password}
                setUsers((prev) => ([
                    ...prev,newUser
                ]))
                onSubmitSuccess()
            }
            else {
                setErrors(prev => ({
                    ...prev,
                    backendError : "Email Already Registerd"
                }))
            }
            }
    }



    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeConfrimPassword = (e) => {
        setConfrimPassword(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center main-bg-contaier">
            <div className="d-flex flex-column justify-content-start align-items-center form-container">
                <img src="https://media.licdn.com/dms/image/C560BAQE500N-c6yNHw/company-logo_200_200/0/1519902853807?e=2147483647&v=beta&t=iUz5_gPXa_wgfSrdhvvhAP_9c2i80WQpEFojFIVISpA" alt="logo" className="logo-image" />
                <h5 className="text-center">SIGN UP</h5>

                <form onSubmit={onSubmitForm}  className="d-flex flex-column user-form">
                    <label className="label" htmlFor="firstName">FIRST NAME</label>
                    <input type="text" className="signin-form-input" id="fullname" value={firstName} placeholder="First Name" onChange={onChangeFirstName} />
                    {errors.firstName && <p className="text-warning">*{errors.firstName}</p>}
                    <label className="label" htmlFor="lastName">LAST NAME</label>
                    <input type="text" className="signin-form-input" id="lastName" value={lastName} placeholder="Last Name" onChange={onChangeLastName} />
                    {errors.lastName && <p className="text-warning">*{errors.lastName}</p>}
                    <label className="label" htmlFor="email">EMAIL</label>
                    <input type="text" className="signin-form-input" id="email" value={email} placeholder="EMAIL" onChange={onChangeEmail} />
                    {errors.email && <p className="text-warning">*{errors.email}</p>}
                    <label className="label" htmlFor="password">PASSWORD</label>
                    <input type="password" className="signin-form-input" id="password" value={password} placeholder="PASSWORD" onChange={onChangePassword} />
                    {errors.password && <p className="text-warning">*{errors.password}</p>}
                    <label className="label"  htmlFor="confrimPassword">CONFRIM PASSWORD</label>
                    <input type="password" className="signin-form-input" id="confrimPassword" value={confirmPassword} placeholder="CONFIRM PASSWORD" onChange={onChangeConfrimPassword} />
                    {errors.confirmPassword && <p className="text-warning">*{errors.confirmPassword}</p>}
                    <button type="submit" className="btn btn-outline-warning mt-3">CREATE ACCOUNT</button>
                    {errors.backendError && <p className="text-warning">*{errors.backendError}</p>}
                </form>
            <h5 className="sign-up-tag">Do you have account ? <span className="text-secondary sign-up" onClick={onClickLogin}>Login</span></h5>
                <p>(or)</p>
                <button type="submit" className="btn btn-primary google-button">Sign in with Google</button>
                
            </div>
        </div>
    )

}

export default SignUp
