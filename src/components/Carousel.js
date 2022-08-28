import React from "react";
const Carousel = ({ user }) => {
    const [getIndex, setIndex]=React.useState(0)

    function slideL() {
        if (getIndex<=0) setIndex(user.pics.length - 1)
        if (0<getIndex) setIndex(getIndex - 1)
    }

    function slideR() {
        const max = user.pics.length - 1
        if (getIndex<max) setIndex(getIndex+1)
        if (max<=getIndex) setIndex(0)
    }
    return (
        <div style={{backgroundImage:`url(${user.pics[getIndex]})`}}  className="Carousel">
            <div onClick={slideL} className="left">
            {'<'}
            </div>
            <div onClick={slideR} className="right">
            {'>'}
            </div>


        </div>
    )
}
export default Carousel;