import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AddContact = ({ onAddContact, personId, onClose }) => {
  const [open, setOpen] = useState(true);
  const [contact, setContact] = useState({ type: "", value: "", personId: personId });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onAddContact(contact); 
      onClose(); 
    } catch (error) {
      console.error("There was an error adding the contact!", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
            value={contact.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="value"
            label="Value"
            type="text"
            fullWidth
            variant="standard"
            value={contact.value}
            onChange={handleChange}
          />
          <input
            type="hidden"
            name="personId"
            value={contact.personId}
            readOnly
          />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContact;
