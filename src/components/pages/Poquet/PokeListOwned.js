import React, { useState } from 'react';
import Pokemon from '../../Pokemon.js'
import '../../../styles/PokeList.css'
import { useMutation, gql  } from '@apollo/client';

import Modal from '../../modal/Modal.js'
import ModalDetail from '../../modal/ModalDetail.js'
import SearchBar from '../../general/SearchBar.js'

const RELEASE = gql`
mutation releasePokemon($id: Int!){
    releasePokemon(id: $id)
  }
`;

function PokeListOwned({ filteredPoke }) {

    const [formState, setFormState] = useState({
        id: '',
        name: '',
        method: ''
    });

    const [releasePoque] = useMutation(RELEASE, {
        variables: {
            id: formState.id
        },
        onCompleted: ({ releasePokemon }) => {
            openModal({ releasePokemon })
        },
        onError: (err) => {
            openModal({ releasePokemon: 'Something Went Wrong' })
        }
    });

    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [respData, setRespData] = useState(false);

    const openModal = ({ releasePokemon }) => {
        setShowModal(prev => !prev);
        setRespData({ releasePokemon });
    };
    const openModalDetail = () => {
        setShowModalDetail(prev => !prev);
    };

    const callMethod = () => {
        if(formState.method === 'release') { 
            releasePoque()
        }else{ 
            openModalDetail();
        }
    }

    const [search, setSearch] = useState('');

    const allPoke = filteredPoke.filter(poke=>
        poke.nickname.toLowerCase().includes(search.toLowerCase())
    )
    
    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <>
            <div className='poke__list-section'>
            
            <Modal showModal={showModal} setShowModal={setShowModal} respData={respData} />
            <ModalDetail showModalDetail={showModalDetail} setShowModalDetail={setShowModalDetail} formState={formState} key={formState}/>
            <SearchBar placeholder='Search Nickname Here' onChange={handleSearch}/>
                <form className='poke__list-form' type="submit" onSubmit={(e) => {
                    e.preventDefault();
                    callMethod();
                }} >
                {allPoke ? allPoke.map(({ name, owned, id, nickname }) => {
                    return <Pokemon
                        key={id}
                        id={id}
                        name={name}
                        nickname={nickname}
                        owned={owned.total}
                        isOwned='true'
                        setFormState={setFormState}
                        formState={formState}
                    />
                })
                    : <div className=''>nothing to show</div>
                }
                </form>
            </div>
            

        </>
    )
}

export default PokeListOwned
