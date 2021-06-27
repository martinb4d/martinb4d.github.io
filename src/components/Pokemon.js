import React from 'react';
import {GiMagnifyingGlass} from 'react-icons/gi'
import {FaSkullCrossbones} from 'react-icons/fa'
import '../styles/Pokemon.css'

function Pokemon({ id, name, nickname, owned, isOwned, setFormState, formState }) {


  return (<>

    <div className='pokemon_container'>
      <div className='pokemon_row'>
        <div className='pokemon'>
          <h1 className='pokemon_h1'>{name}</h1>
          <div className='pokemon_data'>
          {isOwned ?
            <p className='pokemon_data_text'>{nickname}</p>
            :
            <p className='pokemon_data_text'>Owned: <b>{owned}</b></p>
          }
        </div>
        </div>
        
        <div className='pokemon_button_section'>
          {isOwned ?
            <div class='pokemon_button_wrapper'>
              <button title="Execute"
                class="pokemon_button"
                type="submit"
                onClick={(e) =>
                  setFormState({
                    ...formState,
                    id,
                    method: 'release'
                  })
                }
              > <FaSkullCrossbones/> </button>
            </div>
            : ''}
          <div class='pokemon_button_wrapper'>
            <button title="Inspect"
              class="pokemon_button"
              type="submit"
              onClick={() =>
                setFormState({
                  ...formState,
                  name,
                  nickname,
                  method: 'detail'
                })
              }
            > <GiMagnifyingGlass/> </button>
          </div>
        </div>
      </div>
    </div>

  </>)
}

export default Pokemon
