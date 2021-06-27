import React from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import PokeCatch from './PokeCatch'
import { Redirect } from "react-router-dom";
import '../../../styles/PokeCatch.css'

const GET_POKEMON = gql`
  query getPokemon($name: String!){
    pokemon(name: $name){
      name,
      picture,
      moves{move{name, url}},
      types{type{name, url}},
      owned{total}
    }
  }
`;


function WildPoquemon({ index }) {
    let { loading, error, data } = useQuery(GET_POKEMON, { variables: { name: index }, });


    if (loading) return (
        <div className='poke__catch-loading-bg'>
            <div className='poke__catch-loading-wrapper'>
                <img src='images/loading.jpg' alt='loading' className='img-loading' />
            </div>
        </div>
    )
    if (error) return <Redirect to='/Poqatch' />;

    const pokecatchData = {
        topLine: 'LE WILD ',
        name: data.pokemon.name.toUpperCase(),
        bottomLine: 'APPEARS!!!',
        img: data.pokemon.picture
    }
    return (
        <>
            <PokeCatch {...pokecatchData} />

        </>
    );
}

export default WildPoquemon