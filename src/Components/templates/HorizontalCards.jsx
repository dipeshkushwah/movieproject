import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpg'


const HorizontalCards = ({ data }) => {

    return (
        <div className='w-[100%] flex overflow-y-hidden mb-5 p-5'>
            {data.length > 0 ? data.map((d, i) => (
                <Link
                    to={`/${d.media_type}/details/${d.id}`}
                    key={i}
                    className='min-w-[15%] h-[35vh] mr-5 bg-zinc-900 mb-5 rounded-lg'
                >

                    <img
                        className='w-full h-[50%] object-cover rounded-lg'
                        src={
                            d.backdrop_path || d.poster_path ?
                                `https://image.tmdb.org/t/p/original${
                                d.backdrop_path || d.poster_path
                            }` : noimage
                        }
                        alt=""
                    />
                    <div className='text-white p-3 h-[50%] overflow-y-auto'>
                        <h1 className='text-xl font-semibold '>
                            {d.name ||
                                d.title ||
                                d.original_name ||
                                d.original_title}
                        </h1>
                        <p
                            className='text-s'>
                            {d.overview.slice(0, 50)}...
                            <span className='text-zinc-500'>more</span>
                        </p>
                    </div>
                </Link>
            )) : (<h1 className='text-3xl mt-5 text-white font-black text-center'>
                Nothing to show
            </h1>)
            }
        </div>
    )
}

export default HorizontalCards
