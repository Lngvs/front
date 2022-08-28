import { useRef, useState, useContext } from "react"
import mainContext from "../context/mainContext"
const FiltersPage = () => {
    const city = useRef()
    const sValue = useRef()
    const gender = useRef()
    const { getLogin, setLogin, getUser, setUser } = useContext(mainContext)
    const [getSlider, setSlider] = useState(getUser.fAge)
    const [getError, setError]=useState()
    function filter() {
        let data = {
            city: city.current.value,
            gender: gender.current.value,
            sValue: sValue.current.value,
            user:getUser
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch('http://localhost:4000/filter', options)
            .then(res => res.json())
            .then(data => {
                setError(data.msg)
                console.log(data)
                setUser(data.user)
            })
        
        }
    return (
        <div className="FiltersPage">
            <select defaultValue={getUser.fCity} ref={city}>
                    {[
                        'Vilnius',
                        'Kaunas',
                        'Klaipeda',
                        'Kretinga'
                    ].map((x, i) =>
                        <option key={i} value={x}>{x}</option>
                )}
            </select>
            <select  defaultValue={getUser.fGender} ref={gender}>
                    <option value='male'>male</option>
                    <option value='female'>female</option>
            </select>
            <input type='range' id='slider' min='18' max='85' defaultValue={getUser.fAge} ref={sValue} onInput={()=>setSlider(sValue.current.value)}></input>
            <span>{getSlider}</span> 
            <button onClick={filter}>Save Filter</button>
            <h3>{getError}</h3>
        </div>
    )
}
export default FiltersPage;