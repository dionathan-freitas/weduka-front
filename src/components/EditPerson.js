import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const EditPerson = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(API_URL + `contacts/people/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error("Erro ao carregar a pessoa", error);
      }
    };
    fetchPerson();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + `contacts/people/${id}`, { id, name });
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar a pessoa", error);
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      style={{ padding: "2rem", marginTop: "2rem" }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Editar Pessoa
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditPerson;
