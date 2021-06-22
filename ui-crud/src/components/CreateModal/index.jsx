import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, TextInput } from 'carbon-components-react';

const CreateModal = ({ isCreateOpen, setIsCreateOpen }) => {
  return (
    <ComposedModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
      <ModalHeader />
        <ModalBody hasForm>
          <TextInput data-modal-primary-focus labelText="Enter something" />
          <p className="bx--modal-content__text bx--modal-content__regular-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            cursus fermentum risus, sit amet fringilla nunc pellentesque quis. Duis
            quis odio ultrices, cursus lacus ac, posuere felis. Donec dignissim libero
            in augue mattis, a molestie metus vestibulum. Aliquam placerat felis
            ultrices lorem condimentum, nec ullamcorper felis porttitor.
          </p>
      </ModalBody>
</ComposedModal>
  );
};

export default CreateModal;