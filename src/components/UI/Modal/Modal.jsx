import Backdrop from '../Backdrop/Backdrop';

// !!! When used needs a state and an onClick handler so it can close when clicked on the backdrop
const Modal = (props) => {
  // TODO: render only when children or isShown is changed
  return (
    <>
      <Backdrop isShown={props.isShown} onClick={props.closeModal}/>
      <div 
        className='modal'
        style={{
          transform: props.isShown ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.isShown ? '1' : '0'
        }}>
        {props.children}
      </div>
    </>
  );
};

Modal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
