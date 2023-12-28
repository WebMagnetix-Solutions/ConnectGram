/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const CreateMention = ({ text }) => {
    const navigate = useNavigate();
    const regexp = /@(\w+)/g;

    return (
        <span>
            {
                text.split(" ").map((item, index) => {
                    const match = regexp.test(item)
                    let link = null
                    if (match) {
                        link = `/user?username=${item.replace("@", "")}`
                    }
                    return (
                        <span key={index}>{match ? <span className="cursor-pointer text-gray-400" onClick={() => navigate(link)}>{item} </span> : item+" "}</span>
                    )
                })
            }
        </span>
    )
}

export default CreateMention;
