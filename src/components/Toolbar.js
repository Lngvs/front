import { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import mainContext from '../context/mainContext';

const Toolbar = () => {
    const { getUser, getLogin, setUser, setLogin }=useContext(mainContext)
    const nav = useNavigate()
    const [error, setError]=useState()

    function logout() {
        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            credentials: 'include'
        }
        fetch('http://localhost:4000/logout', options)
            .then(res => res.json())
            .then(json => {
                setLogin(false)
                setError(json.msg)
                console.log(json)
                setUser()
                nav('/')
            })
        
    }

    return (
        <div className="toolbar">

                <div>
                    <Link to="/">Register/Login</Link>
                    {!getLogin && <span>{error}</span>}
                {getLogin && <Link to="/Profile">Profile</Link>}
                    {getLogin && getUser.pics.length>=2 && <Link to="/filter">Filters</Link>}
                    {getLogin && getUser.pics.length>=2 && <Link to="/LiksDislikes">Likes and dislikes</Link>}
                    {getLogin && getUser.pics.length>=2 && <Link to="/History">History</Link>}
                    {getLogin && <button onClick={logout}>Logout</button>}
                   
                </div>
            

        </div>
    );
};

export default Toolbar;