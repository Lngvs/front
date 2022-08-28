import { useContext, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import mainContext from "../context/mainContext";
const ProfilePage = () => {
    const [error, setError] = useState()
    const { getUser, getLogin,setUser } = useContext(mainContext)
    const upload = useRef()
    function upPics() {
        const data = {
            pic: upload.current.value,
            user: getUser
        }
        upload.current.value=''
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch('http://localhost:4000/picUpload', options)
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                setError(data.msg)
                console.log(data)
            })

    }
    return (
        getLogin && 
        <div className="ProfilePage">
            <Carousel user={getUser}/>
                <input type='text' placeholder='url' ref={upload} />
                <button onClick={upPics}>upload</button>
                <h2>{error}</h2>
        </div>
    )
}
export default ProfilePage;