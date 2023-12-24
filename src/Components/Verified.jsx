import { Fragment } from "react"

// eslint-disable-next-line react/prop-types
const Verified = ({verified}) => {
    return (
        <Fragment>
            { verified && <img className="w-3 h-3 mx-1 mt-0.5 " src={ import.meta.env.VITE_VERIFY } /> }
        </Fragment>
    )
}

export default Verified
