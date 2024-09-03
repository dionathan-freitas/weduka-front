import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { API_URL } from "../config";

const AddPerson = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "contacts/people", { name });
      navigate("/");
    } catch (error) {
      console.error("There was an error adding the person!", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "500px" }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Add New Person
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Person
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPerson;
