import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Modal from '../../modal/Modal.js'
import '../../../styles/PokeCatch.css'

const CREATE_LINK_MUTATION = gql`
    mutation catchPokemon($name: String!, $nickname: String, $item: String!){
        catchPokemon(name: $name, nickname: $nickname, item: $item){
            message
            respCode
        }
    }
`;

function PokeCatch({topLine, name, bottomLine, img, alt }) {

    const [showModal, setShowModal] = useState(false);
    
    const [formState, setFormState] = useState({
        nickname: '',
        name:'',
        item:''
    });

    const [respData, setRespData] = useState(false);

    const openModal = ({catchPokemon}) => {
        setShowModal(prev => !prev);
        setRespData({...catchPokemon});
    };

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            nickname: formState.nickname,
            name: formState.name,
            item: formState.item
        },
        onCompleted: ({catchPokemon}) =>  {
            openModal({catchPokemon})
        },
        onError: (err) => {
            openModal({catchPokemon:{respCode:'99'}})
        }
    });

    return (<>
     
        <div className='poke__catch-section'>
        <Modal showModal={showModal} setShowModal={setShowModal} respData={respData} />
            <div className="container poke__catch-container">
                <div className="row poke__catch-row"
                    style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="col">
                        <div className="poke__catch-img-wrapper">
                            <img src={img} alt={alt} className='poke__catch-img' />
                        </div>
                    </div>
                    <div className="col">
                        <div className="poke__catch-text-wrapper">
                            <div className="poke__catch-top-line">
                                {topLine}
                            </div>
                            <h1 className='poke__catch-heading'>
                                {name}
                            </h1>
                            <p className='poke__catch-subtitle' >
                                {bottomLine}
                            </p>
                        </div>
                        <div className="form__poqatch">
                            <form type="submit" onSubmit={(e) => {
                                e.preventDefault();
                                createLink();
                               
                            }} >

                                <div className="form__poqatch-inputs">
                                    <label htmlFor="nickname" className="form__poqatch-label">
                                        <input
                                            type="text"
                                            name="nickname"
                                            className="form__poqatch-input"
                                            placeholder='Poquemon NickName'
                                            onChange={(e) =>
                                                setFormState({
                                                    ...formState,
                                                    nickname: e.target.value
                                                })
                                            }
                                        />

                                    </label>
                                    <button 
                                        className="form__poqatch-input-btn1" 
                                        type="submit" 
                                        onClick={(e) =>
                                            setFormState({
                                                ...formState,
                                                name,
                                                item: 'POKEBALL'
                                            })
                                        }
                                    > Throw Pokeball </button>
                                    <button 
                                        className="form__poqatch-input-btn2" 
                                        type="submit" 
                                        onClick={(e) =>
                                            setFormState({
                                                ...formState,
                                                name,
                                                item: 'BOWLINGBALL'
                                            })
                                        }
                                    > Throw Stone </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
               
            </div>
            
        </div>
        
    </>)
}

export default PokeCatch
