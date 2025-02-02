import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Cards from './templates/Cards';
import Dropdown from './templates/Dropdown';
import axios from '../utils/Axios';
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component"

const Trending = () => {
    document.title = "DMH | Trending";
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);




    const GetTrending = async () => {
        try {
            const { data } = await axios.get(
                `/trending/${category}/${duration}?page=${page}`
            );
            if (data.results.length > 0) {
                setTrending((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
            } else {
                sethasMore(false);
            }
            //setTrending(data.results);
        }
        catch (error) {
            console.error(error);
        }
    };
    const refreshHandler = () => {
        if (trending.length === 0) {
            GetTrending();
        } else {
            setpage(1);
            setTrending([]);
            GetTrending();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    return trending.length > 0 ? (
        <div className=' w-screen h-screen'>
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556cd] ri-arrow-left-line"></i>{" "}
                    Trending
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={['movie', 'tv', 'all']}
                        func={(e) => setcategory(e.target.value)}
                    />

                    <div className='w-[2%]'></div>
                    <Dropdown
                        title="Duration"
                        options={['week', 'day']}
                        func={(e) => setduration(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Trending
