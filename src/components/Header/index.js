import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Header = (props) => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove("my_token")
        navigate("/")
    }
    return (
        <div className="header-container">
            <img src="https://www.kratin.co.in/images/kratin01.png" alt="header-logo" className="header-logo" />
            <div className="nav-container">
                <p className="nav-item">Home</p>
                <p className="nav-item">DeAllocate</p>
                <p className="nav-item" onClick={onLogout}>Logout</p>
            </div>
        </div>
    )
}

export default Header