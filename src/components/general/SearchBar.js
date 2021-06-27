import React from 'react'
import '../../styles/SearchBar.css'

function SearchBar({...data}) {
    return (
        <>
            <div className='search_wrapper'>
                <input className='search_input' {...data}/>
            </div>
        </>
    )
}

export default SearchBar
