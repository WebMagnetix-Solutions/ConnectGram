import { dummyPost } from "../../Constants/DummyPost"

const Feed = () => {
    return (
        <div className="col-span-12 sm:col-span-11 md:col-span-9 lg:col-span-6 mx-auto">
           
            <div className="pb-14 sm:pb-0 pt-1 bg-[#222] h-screen overflow-y-auto">
                {
                    dummyPost.map((item, index) => {
                        return (
                            <div key={index} className="bg-[#333] p-2 bg-opacity-30 mb-3 rounded-xl w-96">

                                <div className="flex justify-between">
                                    <div className="flex items-center mb-2">

                                        <div className="cursor-pointer">
                                            <img src={item.pic} alt={item.username} className="w-10 h-10 rounded-full" />
                                        </div>

                                        <div className="flex ml-1 flex-col text-white text-opacity-70 mt-[-5px]">
                                            <span className="text-base cursor-pointer">{item.username}</span>
                                            <span className="text-[10px] cursor-pointer">{ item.location }</span>
                                        </div>

                                    </div>

                                    <div className=" cursor-pointer">
                                        <i className="fa fa-ellipsis text-white text-opacity-70"></i>
                                    </div>

                                </div>

                                <div>
                                    <img src={item.post} alt={item.description} className="rounded-xl flex w-full object-contain" />
                                </div>

                                <div className="mt-2 flex justify-between text-white text-opacity-70">
                                    
                                    <div className="flex justify-between gap-3 text-lg">
                                        <i className="far fa-heart"></i>
                                        <i className="far fa-comment"></i>
                                        <i className="far fa-paper-plane"></i>
                                    </div>
                                    <div className="text-lg">
                                        <i className="far fa-bookmark"></i>
                                    </div>

                                </div>

                                <p className="text-sm mb-1 text-white text-opacity-70">{ item.likes } Likes</p>

                                <div className="break-words text-xs text-white text-opacity-50">
                                    <span className="font-semibold text-white text-opacity-80">{item.username}</span> {item.description + "sdkjfjhskjdhfksdhfiuweiuhweiuwiueriwuyeiruwyeiurywieuykbkskdjfhkshdfkshdkfhskdhfkshfkshkbkcbvmxcvxbmcvnbxmcbvkshdkfhsdkfhskdhfkshdfkhsieurwurkdhkjshdkfhsdkfksjhdfksjhdfkjshkajhkahsdkahskdhaksjhdkahskdjhakshdkahsdkahskdhkahsdkahs"}
                                </div>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Feed
