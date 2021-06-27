import React, { useRef, useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import '../../styles/ModalDetail.css'
import { useQuery, gql  } from '@apollo/client';

const GET_POKEMONS = gql`
query getPokemons($name: String!) {
  pokemon(name: $name) {
    name
    url
    picture
    moves{move{name, url}}
    types{type{name, url}}
  }
}
`;

function ModalDetail({ showModalDetail, setShowModalDetail, formState}) {
  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: { name: formState.name.toLowerCase() }, });

  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModalDetail(false);
    }
  };

  function closeThis(){
    setShowModalDetail(prev => !prev);
  }

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModalDetail) {
        setShowModalDetail(false);
      }
    },
    [setShowModalDetail, showModalDetail]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  function renderMoves(data) {
    let data1;
    let data2;
    let data3;
    if(data.length > 8){
      data1 = data.slice(1, 8);
      data = data.slice(7, data.length);
    }else{
      data1 = data;
      data=[]
    }
    if(data.length > 8){
      data2 = data.slice(1, 8);
      data = data.slice(7, data.length);
    }else{
      data2 = data;
      data = []
    }
    if(data.length > 8){
      data3 = data.slice(1, 8);
    }else{
      data3 = data;
    }
    return (
      <>
        {data1 ? 
        <div className='modal-detail-right-content-column1'>
        {
          data1.map(({ move }) => (
            <h6>
                {move.name}
            </h6>
          )
          )
        }
        </div>
        : '' }
        {data2 ? 
        <div className='modal-detail-right-content-column2'>
        {
          data2.map(({ move }) => (
            <h6>
                {move.name}
            </h6>
          )
          )
        }
        </div>
        : '' }
        { data3 ? 
        <div className='modal-detail-right-content-column3'>
        {
          data3.map(({ move }) => (
            <h6>
              {move.name}
            </h6>
          )
          )
        }
        </div>
        : ''}
      </>
      
      
    )
  }

  function renderTypes(data) {
    return (<>
      <h5>
      {
          data.map(({ type }) => (
            type.name+' '
          )
          )
        }
      </h5>
    </>)
  }


  if (loading) return <p></p>;
  if (error) return <p></p>;

  return (
    <>
      {showModalDetail ? (
        <div className='modal-detail-background' onClick={closeModal} ref={modalRef}>
          <div className='modal-detail-wrapper' >
                <div className='modal-detail-left-content'>
                  <div className='modal-detail-upperleft-content'>
                    
                    <div className='modal-detail-content'>
                      <h2>{data.pokemon.name.toLowerCase()}</h2>
                      {formState.nickname?
                        <h5>Nickname : {formState.nickname}</h5>
                        :<></>
                      }
                      
                    </div>
                    <img className='modal-detail-img' src={data.pokemon.picture}  />
                  </div>
                  <div className='modal-detail-type-content'>
                    <h3>Poquemon types</h3>
                      {renderTypes(data.pokemon.types)}
                  </div>
                </div>
                <div className='modal-detail-right-content'>
                  <h3>Poquemon Moves</h3>
                  <div className='modal-detail-move-content'>
                  
                    {renderMoves(data.pokemon.moves)}
                    
                  </div>
                  
                </div>
              
              
            <div className='modal-detail-close-button'
              aria-label='Close modal'
              onClick={closeThis}
            ><MdClose/></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ModalDetail
