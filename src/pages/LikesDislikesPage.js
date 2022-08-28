import Carousel from "../components/Carousel";
import { useState, useContext, useEffect } from "react";
import mainContext from "../context/mainContext";
const LikesDislikesPage = () => {
    
    const { getUser, setUser, getUsers, setUsers } = useContext(mainContext);
    useEffect(() => {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(getUser),
            credentials: 'include'
        }
        fetch('http://localhost:4000/allUsers', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.users =data.users.filter(x =>
                x.city === getUser.fCity &&
                x.gender === getUser.fGender &&
                x.age <= getUser.fAge &&
                !getUser.liked.includes(x._id) &&
                !getUser.disliked.includes(x._id)
            ) 
            setUsers(data.users)
        })    
    }, [])
    function dislike() {
        const data = {
            disliker:getUser,
            disliked:getUsers[0]
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch('http://localhost:4000/disLiked', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data.user)
            setUsers(old => {
                old.shift()
                return [...old]
            })
        })
    
    }
    function like() {
        const data = {
            liker:getUser,
            liked:getUsers[0]
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch('http://localhost:4000/liked', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data.user)
            setUsers(old => {
                old.shift()
                return [...old]
            })
        })

    }
    return (
         getUsers.length > 0 &&
        <div className="LikesDislikesPage">
            <Carousel user={getUsers[0]} />
            {getUsers[0].username} {getUsers[0].age}
            <button onClick={dislike}>Dislike</button> 
            <button onClick={like}>Like</button>    
        </div >
    
    )
}
export default LikesDislikesPage;