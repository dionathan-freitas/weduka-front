import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import { API_URL } from "../config";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`${API_URL}contacts/people/${id}`);
        setPerson(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("There was an error fetching the person details!", error);
        setError("Failed to fetch person details.");
        setLoading(false); 
      }
    };

    fetchPerson();
  }, [id]);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`${API_URL}contacts/${contactId}`);
      setPerson((prevPerson) => ({
        ...prevPerson,
        contacts: prevPerson.contacts.filter(
          (contact) => contact.id !== contactId
        ),
      }));
    } catch (error) {
      console.error("There was an error deleting the contact!", error);
    }
  };

  const handleDeletePerson = async () => {
    try {
      await axios.delete(`${API_URL}contacts/people/${id}`);
      window.location.href = "/";
    } catch (error) {
      console.error("There was an error deleting the person!", error);
      alert("Failed to delete the person. Please try again.");
    }
  };

  const handleAddContact = async (contact) => {
    try {
      const response = await axios.post(`${API_URL}contacts`, contact);

      if (response.status === 201) {
        setPerson((prevPerson) => ({
          ...prevPerson,
          contacts: [...prevPerson.contacts, response.data],
        }));
        setShowAddContact(false);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("There was an error adding the contact!", error);
    }
  };

  const handleEditContact = async (updatedContact) => {
    try {
      if (!updatedContact.id || !updatedContact.personId) {
        console.error("Contact ID or Person ID is missing");
        return;
      }

      const response = await axios.put(
        `${API_URL}contacts/${updatedContact.id}`,
        updatedContact
      );

      if (response.status === 204) {
        setPerson((prevPerson) => ({
          ...prevPerson,
          contacts: prevPerson.contacts.map((contact) =>
            contact.id === updatedContact.id
              ? { ...contact, ...updatedContact }
              : contact
          ),
        }));
        setEditContactId(null);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("There was an error updating the contact!", error);
    }
  };

  const handleCloseEditContact = () => {
    setEditContactId(null);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!person) return <Typography>No person found!</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {person.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Contacts</Typography>
              <List>
                {person.contacts.map((contact) => (
                  <ListItem key={contact.id}>
                    <ListItemText
                      primary={`${contact.type}: ${contact.value}`}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Edit />}
                      onClick={() => setEditContactId(contact.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(contact.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            component={Link}
            to={`/edit-person/${person.id}`}
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "#fff" }}
            startIcon={<Edit />}
          >
            Edit Person
          </Button>
          <br />
          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "16px" }}
            onClick={handleDeletePerson}
          >
            Delete Person
          </Button>
        </Grid>
      </Grid>

      {showAddContact && (
        <AddContact
          onAddContact={handleAddContact}
          personId={id}
          onClose={() => setShowAddContact(false)}
        />
      )}

      {editContactId && (
        <EditContact
          contactId={editContactId}
          personId={id}
          onUpdateContact={handleEditContact}
          onClose={handleCloseEditContact}
        />
      )}

      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        <Grid item>
          <Button
            component={Link}
            to="/"
            variant="contained"
            style={{ backgroundColor: "#1976d2", color: "#fff" }}
          >
            Back to List
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              marginLeft: "5px",
            }}
            startIcon={<Add />}
            onClick={() => setShowAddContact(true)}
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonDetail;
