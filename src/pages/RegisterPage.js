import { useRef, useState, useContext } from 'react';
import mainContext from '../context/mainContext';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const username = useRef()
    const passOne = useRef()
    const passTwo = useRef()
    const age = useRef()
   const city = useRef( )
    const gender = useRef()
    const logName = useRef()
    const logPass = useRef()
    const box = useRef()
    const [error, setError] = useState()
    const { getLogin, setLogin, getUser, setUser } = useContext(mainContext)
    const nav=useNavigate()
    
    function register() {
        if (passOne.current.value !== passTwo.current.value) return setError('Passwords does not match')
        const user = {
            username: username.current.value,
            password: passOne.current.value,
            age: age.current.value,
            city: city.current.value,
            gender: gender.current.value,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include'

        }
        fetch('http://localhost:4000/register', options)
            .then(res => res.json())
            .then(json => {
                setError(json.msg)
            })
    
    }
    function login() {
        let user = {
            username: logName.current.value,
            password: logPass.current.value,
            box: box.current.checked
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch('http://localhost:4000/login', options)
        .then(res => res.json())
            .then(data => {
                setError(data.msg)
            console.log(data)
            if (!data.error) {
                setUser(data.user)
                setLogin(true)
                nav('/profile')
            }
        
        })

    }

    return (
        <div className='RegisterPage'>
            <div className='register'>

                <input type='text' defaultValue='Test' placeholder='UserName' ref={username} />
                <input type='text' defaultValue='mants' placeholder='Password' ref={passOne} />
                <input type='text' defaultValue='mants' placeholder='Password' ref={passTwo} />
                <select defaultValue='kretinga' ref={city}>
                    {[
                        'Vilnius',
                        'Kaunas',
                        'Klaipeda',
                        'Kretinga'
                    ].map((x, i) =>
                        <option key={i} value={x}>{x}</option>
                    )}
                </select>
                <select  defaultValue='male' ref={gender}>
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                </select>
                <input type='number'  defaultValue='25' placeholder='69' ref={age} />
                <button onClick={register}>Register</button>
            
            </div>
            <div className='login'>

                <input type='text' placeholder='UserName' defaultValue='Test'  ref={logName} />
                <input type='text' placeholder='Password' defaultValue='mants' ref={logPass} />
                <input type='checkbox' defaultChecked id='check' name='check' ref={box} />
                <label htmlFor='check'  >Stay logged in</label>
                <button onClick={login}>Login</button>
                <h2>{error}</h2>
            </div>
        </div>
    );
};

export default RegisterPage;