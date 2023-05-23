import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Header = (props) => {
    const {deAllocating, allocatedUser, userId, allocations} = props
    console.log("userHeader",userId,allocations)
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove("my_token")
        navigate("/")
    }
    let statusButton = "Allocate"
    if(allocatedUser) {
        statusButton = "DeAllocate"
    }
    const onClickDeAllocate = () => {
        
        const allocationDetails = allocations.filter(each => each.userId === userId )
        const {allocationId} = allocationDetails[0]
        deAllocating(allocationId)
    }

    return (
        <div className="header-container">
            <img src="https://www.kratin.co.in/images/kratin01.png" alt="header-logo" className="header-logo" />
            <div className="nav-container">
                {allocatedUser ? 
                    (<p className="nav-item" onClick={onClickDeAllocate}>{statusButton}</p>)
                    :
                    (<p className="nav-item">{statusButton}</p>)}
                <p className="nav-item" onClick={onLogout}>Logout</p>
            </div>
        </div>
    )
}

export default Header