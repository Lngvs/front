import { useEffect, useState, useContext } from "react";
import mainContext from '../context/mainContext';
import Carousel from "../components/Carousel";
const HistoryPage = () => {
    const { getLogin, setLogin, getUser, setUser,getUsers, setUsers } = useContext(mainContext)
    const [getSwitch, setSwitch] = useState('liked')
    useEffect(() => { 
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ list: getUser[getSwitch] }),
            credentials: 'include'

        }
        fetch('http://localhost:4000/list', options)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users)
                console.log(data)
            })
    
    },[getSwitch])
    return (
        <div className="HistoryPage">
            <h1 onClick={()=>setSwitch('liked')}> People i liked ({getUser.liked.length})  </h1>
            <h1 onClick={()=>setSwitch('likedBy')}> People who liked me ({getUser.likedBy.length})  </h1>
            <div className="list">
                {getUsers.map((x, i) =>
                    <div key={i}>
                        <Carousel user={x} />
                    </div>
                )}
            </div>
    </div>
    )
}
export default HistoryPage;