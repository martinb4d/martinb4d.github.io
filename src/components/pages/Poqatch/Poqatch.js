import React, { Component } from 'react'
import WildPokemon from './WildPoquemon';


function getRandomInt(max) {
    return (Math.floor(Math.random() * max) + 1).toString();
}

class Poqatch extends Component {

    render() {
        return (
            <WildPokemon index={getRandomInt(898)} />
        );
    }
}
export default Poqatch
