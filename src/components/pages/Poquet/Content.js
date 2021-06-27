import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Redirect } from "react-router-dom";
import PokeListOwned from './PokeListOwned.js';

const GET_BASEMENT = gql`
query getBasements($name: String){
    basement(name: $name){
      name,
      owned{
        total
      },
      nickname,
      id
    }
  }
`;

function Content({ name }) {

  const { loading, error, data } = useQuery(GET_BASEMENT,
    { variables: { name: name }, fetchPolicy: "no-cache" },
  );

  if (loading) return (
    <div className='poke__catch-loading-bg'>
      <div className='poke__catch-loading-wrapper'>
        <img src='images/loading.jpg' alt='loading' className='img-loading' />
      </div>
    </div>
  )
  if (error) return <Redirect to='/Poquet' />;

  return (
    <>
      <PokeListOwned filteredPoke={data.basement} />
    </>

  );
}

export default Content