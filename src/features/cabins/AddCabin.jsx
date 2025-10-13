import Button from 'ui/Button';
import Modal from 'ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
   return (
      <Modal>
         <Modal.Toggle opens="cabin-form">
            <Button>Add new cabin</Button>
         </Modal.Toggle>
         <Modal.Window name="cabin-form">
            <CreateCabinForm />
         </Modal.Window>
      </Modal>
   );
}

export default AddCabin;
