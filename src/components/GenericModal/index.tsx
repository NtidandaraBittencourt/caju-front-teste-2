import React, { ReactNode } from 'react';
import {
  Modal,
  Box
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

const GenericModal: React.FC<ModalProps> = ({ open, onClose, children }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default GenericModal;