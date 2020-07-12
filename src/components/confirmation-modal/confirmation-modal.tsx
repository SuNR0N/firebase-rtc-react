import React, { createRef, FC } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (id?: string) => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ onClose, onConfirm, show }) => {
  const inputRef = createRef<HTMLInputElement>();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Join Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Room #</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl ref={inputRef} placeholder="Room ID to join" aria-label="Room ID" aria-describedby="basic-addon1" />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onConfirm(inputRef.current?.value)}>
          Join
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
