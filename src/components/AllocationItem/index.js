import {useState} from "react"
import "./index.css"


const AllocationItem = (props) => {
    // const [timer, setTimer] = useState ()
    const {each, allocating, deAllocating, id,allocatedUser, users} = props
    const {userId, allocationId, resource} = each
    const onClickAllocate = () => {
        allocating(allocationId)
    }
    const onClickRemoveAllocate = () => {
        deAllocating(allocationId)
    }
    let user
    if (userId !== "") {
        const getAllocatedUserDetails = users.filter(eachUser => eachUser.id === userId)
        const {firstName,lastName} = getAllocatedUserDetails[0]
        user = firstName + " " + lastName
    }

    

    const getTheButton = () => {
        if (allocatedUser) {
            if (userId !== "" ) {
                if (userId === id){
                    return <button type="button" className="remove-allocation" onClick={onClickRemoveAllocate}>DeAllocate</button>
                }
                return <button type="button" className="allocated" disabled >Allocated</button>
            }
            return <button type="button" className="allocated" disabled >Allocate</button>
        }
        else {
            if (userId !== ""){
                return <button type="button" className="allocated" disabled >Allocated</button>
            }
            return <button type="button" onClick={onClickAllocate} className="allocate">Allocate</button>
        }
    }

    return (
        <li className="dash-list-item">
            <h1>{resource}</h1>
            {userId !== "" ? <h5>Allocated </h5> : <h5>Not in use</h5>}
            {userId !== "" && <p className="name">{user}</p>}
            <div className="d-felx flex-column">
                {getTheButton()}
            </div>
        </li>
    )
}

export default AllocationItem