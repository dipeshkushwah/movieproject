import React, { useState, useEffect } from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import axios from '../utils/Axios'
import Loading from './Loading'

const Home = () => {
    document.title = "DMH | Homepage"
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
            setWallpaper(randomdata);
        }
        catch (error) {
            console.error(error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            setTrending(data.results);

        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        GetTrending();
        !wallpaper && GetHeaderWallpaper();
    }, [category]);

    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
                <Topnav />
                <Header data={wallpaper} />
                <div className='p-6 flex justify-between'>
                    <h1 className='mb-5 text-3xl font-semibold text-zinc-400'>
                        Trending
                    </h1>
                    <Dropdown
                        title="Filter"
                        options={['tv', 'movie', 'all']}
                        func={(e) => setcategory(e.target.value)}
                    />

                </div>
                <HorizontalCards data={trending} />
            </div>
        </>
    ) : (
        <Loading />
    );
}

export default Home
