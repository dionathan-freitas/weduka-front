import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../config";

const EditContact = ({ contactId, personId, onUpdateContact, onClose }) => {
  const [contact, setContact] = useState({
    id: "",
    type: "",
    value: "",
    personId: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${API_URL}contacts/${contactId}`);
        setContact(response.data);
      } catch (error) {
        console.error("There was an error fetching the contact details!", error);
      }
    };
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedContact = {
      id: contact.id,
      type: contact.type,
      value: contact.value,
      personId: contact.personId // Certifique-se de que isso está correto
    };

    try {
      await onUpdateContact(updatedContact);
      onClose();
    } catch (error) {
      console.error("There was an error updating the contact!", error);
    }
  };

  return (
    <Dialog open={!!contactId} onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
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
          <input type="hidden" name="id" value={contact.id} readOnly />
          <input
            type="hidden"
            name="personId"
            value={contact.personId}
            readOnly
          />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
