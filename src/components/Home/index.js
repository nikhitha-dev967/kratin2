import {useParams} from "react-router-dom"
import Header from "../Header"
import AllocationItem from "../AllocationItem"
import "./index.css"

const Home = (props) => {
    const {users, allocations, setAllocations} = props
    const {id} = useParams()
    const allocatedUser = allocations.filter(each => each.userId === id).length > 0 ? true : false
    

    const allocating = (allocationId) => {
        const currTime = new Date()
        const newAllocations = allocations.map(eachAllocation => {
                if (eachAllocation.allocationId === allocationId) {
                    if (eachAllocation.userId === "")
                        return {...eachAllocation, userId : id, time : currTime}
                }
                return eachAllocation
            })
        setAllocations(newAllocations)
    }

    const deAllocating = (allocationId) => {
        const newAllocations = allocations.map(eachAllocation => {
                if (eachAllocation.allocationId === allocationId && eachAllocation.userId === id) {
                        return {...eachAllocation, userId : "", time : null}
                }
                return eachAllocation
            })
        setAllocations(newAllocations)
    }
    
    const myDetails = users.filter(eachUser => eachUser.id === id)
    const {firstName, lastName} = myDetails[0]
    return (
        <div>
            <Header allocations={allocations} userId={id} allocatedUser={allocatedUser} deAllocating={deAllocating}/>
            <div className="home-container">
                <h1>Welcome, {" "}{firstName}{" "}{lastName}</h1>
                <div>
                    <ul className="dash-list-container">
                        {allocations.map(each => <AllocationItem deAllocating={deAllocating} allocatedUser={allocatedUser} users={users} allocating={allocating} each={each} key={each.allocationId} id={id} />)}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home