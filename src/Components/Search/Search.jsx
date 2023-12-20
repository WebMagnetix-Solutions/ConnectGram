import { useState } from "react"
import { userList } from "../../Utils/api/user"

const Search = () => {

    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState("")

    const getSearchResult = async () => {
        if (search) {
            const result = await userList(search)
            setSearchResult(result)
        }
    }

    return (
        <div className="pb-16 sm:pb-1 pt-3 text-white w-full px-2 sm:px-10 h-screen overflow-y-auto">
            <div className="relative rounded-3xl">
                <div className="w-full">
                    <input value={search} onChange={e=>setSearch(e.target.value)} type="text" name="search" placeholder="Search user" className="p-3 w-full pr-16 rounded-3xl bg-[#333] bg-opacity-30 outline-none"/>
                    <div onClick={getSearchResult} className="absolute top-0 p-2.5 px-5 bg-opacity-10 cursor-pointer right-0 rounded-r-3xl">
                        <i className="fa fa-search text-lg"></i>
                    </div>
                </div>
                <div className="pt-5 flex justify-center flex-wrap gap-5">
                    {
                        searchResult.map((item) => {
                            return (
                                <div key={item._id} className="bg-[#333] bg-opacity-30 rounded-xl p-2 sm:p-5">
                                    <div className="flex justify-center">
                                        <img src={item.pic} alt={item.username} className="w-14 h-14 rounded-full" />
                                    </div>
                                    <div className="flex justify-between items-center flex-col">
                                        <h2>{item.name}</h2>
                                        <p className="text-xs">@{item.username}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
