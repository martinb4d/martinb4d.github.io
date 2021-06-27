import React, { useState, useEffect } from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import { Button } from '../../general/Button.js'
import { BsSearch } from 'react-icons/bs'

import ModalDetail from '../../modal/ModalDetail.js'
import '../../../styles/PokeList.css'

import SearchBar from '../../general/SearchBar.js'
import PokeList from './PokeList.js';

const GET_POKEMONS = gql`
query getPokemons($limit: Int, $offset: Int){
    pokemons(limit: $limit, offset: $offset){
      name,
      url,
      picture,
      owned{total}
    }
  }
`;

function PoqueList({ limitInput, offsetInput }) {

    const [formState, setFormState] = useState({
        listData: [],
        isLoading: '',
        page: 0,
        limit: limitInput,
        offset: offsetInput,
        limitInput,
        offsetInput,
        name: '',
        method: ''
    });


    const [search, setSearch] = useState('');

    const onInitialSearch = () => {
        setFormState({
            ...formState,
            limit: parseInt(formState.limitInput),
            offset: parseInt(formState.offsetInput),
            page: 0
        })
    }
    const onPaginatedSearch = (e) => {
        setFormState({
            ...formState,
            offset: (formState.offset+formState.listData.length),
            isLoading: false,
            page: formState.page + 1
        })
        setSearch('')
    }


    const onSetResult = (result, page) =>
        page === 0
            ? setFormState({
                ...formState,
                listData: [...result],
                isLoading: false
            })
            :
            setFormState({
                ...formState,
                listData: [...formState.listData, ...result],
                isLoading: false
            })


    const [showModalDetail, setShowModalDetail] = useState(false);

    const openModalDetail = () => {
        setShowModalDetail(prev => !prev);
    };

    const callMethod = (e) => {
        e.preventDefault();
        if (formState.method === 'detail') {
            openModalDetail();
        } else {
            onInitialSearch();
        }
    }


    const allPoke = formState.listData.filter(poke =>
        poke.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }

    const { loading, error, data } = useQuery(GET_POKEMONS,
        { variables: { limit: formState.limit, offset: formState.offset }, fetchPolicy: "no-cache", },
    );

    useEffect(() => {
        if (loading === false && data) {
            onSetResult(data.pokemons, formState.page)
        }
    }, [loading, data]);

    if (loading) return (
        <div className='poke__catch-loading-bg'>
            <div className='poke__catch-loading-wrapper'>
                <img src='images/loading.jpg' alt='loading' className='img-loading' />
            </div>
        </div>
    )
    if (error) return 'error';

    return (
        <>
            <div className="poke__list-section">

                <ModalDetail showModalDetail={showModalDetail} setShowModalDetail={setShowModalDetail} formState={formState} />
                
                <form className="poke__list-form" type="submit" onSubmit={callMethod}  >
                    <div className="poke__list-form-inputs">
                        <label htmlFor="limit" class="poke__list-form-label">
                            <input
                                type="text"
                                name="limit"
                                className="poke__list-form-input"
                                placeholder='Enter Page limit'
                                defaultValue={formState.limit}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        limitInput: parseInt(e.target.value)
                                    })
                                }
                            />
                        </label>
                        <label htmlFor="offsetVal" class="poke__list-form-label">
                            <input
                                type="text"
                                name="offsetVal"
                                className="poke__list-form-input"
                                placeholder='Enter offset'
                                defaultValue={formState.offsetInput}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        offsetInput: parseInt(e.target.value)
                                    })
                                }
                            />
                        </label>
                        <button
                            class="poke__list-form-input-btn"
                            type="submit"
                            onClick={() =>
                                setFormState({
                                    ...formState,
                                    method: 'search'
                                })
                            }
                        >Show</button>
                    </div>
                    <SearchBar placeholder='Search Name Here' onChange={handleSearch} />
                    <PokeList filteredPoke={allPoke} setFormState={setFormState} formState={formState} />
                    <div className="pokelist__poke-form">
                        {
                            (formState.offset !== null && !formState.isLoading) &&
                            <Button buttonSize='btn--wide' buttonColor='blue'
                                onClick={onPaginatedSearch}
                            >
                                More
                            </Button>

                        }
                    </div>

                </form>
            </div>
        </>

    );
}

export default PoqueList