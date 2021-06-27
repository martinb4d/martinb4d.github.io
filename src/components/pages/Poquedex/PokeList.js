import React, { useState } from 'react';
import Pokemon from '../../Pokemon.js'
import '../../../styles/PokeList.css'

function PokeList({ filteredPoke, setFormState, formState}) {

    return (
        <>

            {filteredPoke ? filteredPoke.map(data => {
                return <Pokemon
                    id={data.id}
                    name={data.name}
                    nickname={data.nickname}
                    owned={data.owned.total}
                    setFormState={setFormState}
                    formState={formState}
                />
            })
                : <div className=''>nothing to show</div>
            }

        </>
    )
}

export default PokeList
