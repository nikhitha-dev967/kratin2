import {useState} from "react"
import "./index.css"

const AllocationItem = (props) => {
    const [timer, setTimer] = useState ()
    const {each, allocating, deAllocating, id,allocatedUser, users} = props
    console.log(allocatedUser)
    const {userId, allocationId, resource, time} = each
    console.log()
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

    const getTime = () => {
        if (time !== null) {
            const diffTime = new Date() - new Date(time)
            const hours = diffTime/(1000*60*60)
            const minutes = diffTime%(1000*60*60)/(1000*60)
            const allocatedTime = `${parseInt(hours)} hours and ${parseInt(minutes)} minutes`
            setInterval( () => {
                setTimer(allocatedTime)
            },5000)
            console.log(timer)
            return <p>{allocatedTime}</p>
        }
        return <p>{`0 hours and 0 minutes`}</p>
    }

    const getTheButton = () => {
        if (allocatedUser) {
            if (userId !== "" ) {
                if (userId === id){
                    return <button type="button" className="remove-allocation" onClick={onClickRemoveAllocate}>Remove Allocation</button>
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
                {getTime()}
                {getTheButton()}
            </div>
        </li>
    )
}

export default AllocationItem