import React from 'react'
import { clearCart } from '../features/cartSlice';
import { closeModal } from '../features/modal/modalSlice';

import { useDispatch } from 'react-redux';
const Modal = () => {

    const dispatch = useDispatch();
  return (
    <aside className='modal-container'>
      Modal
      <div className='modal'>
        <h4>remove all items from your shopping Cart?</h4>
      </div>
      <div className='btn-container'>
        <button
          type='button'
          className='btn confirm-btn'
          onClick={() => {
            dispatch(clearCart());
            dispatch(closeModal());
        }}
        >
          confirm
        </button>
        <button
          type='button'
          className='btn cancel-btn'
          onClick={() => dispatch(closeModal())}
        >
          cancel
        </button>
      </div>
    </aside>
  );
}

export default Modal