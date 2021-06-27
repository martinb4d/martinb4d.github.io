import React, { useRef, useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import '../../styles/Modal.css'
import { useHistory } from 'react-router-dom';

function Modal({ showModal, setShowModal, respData }) {
  const modalRef = useRef();

  const history = useHistory();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      reloadWildling();
    }
  };

  function closeThis() {
    setShowModal(prev => !prev);
    reloadWildling();
  }

  function reloadWildling() {
    // if (respData.respCode) {
    //   history.push("/Poqatch");
    // } else {
      history.go(0);
    // }
  }

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <div className='modal-background' onClick={closeModal} ref={modalRef}>
          <div className='modal-wrapper' >

            <img className='modal-img' src={
              respData.respCode ?
                respData.respCode === '00' ? 'images/catched.png' : 'images/boo.jpg'
                : 'images/release.jpg'
            } alt='camera' />
            <div className='modal-content'>
              <h1>{respData.respCode ? respData.message : respData.releasePokemon}</h1>
              <button onClick={closeThis}>OK</button>
            </div>


            <div className='modal-close-button'
              aria-label='Close modal'
              onClick={closeThis}
            ><MdClose /></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal
