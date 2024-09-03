import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, Card, CardContent } from '@mui/material';
import { Edit, Add, Visibility, Delete } from '@mui/icons-material';
import { API_URL } from '../config'; 
const PeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(API_URL + 'contacts/people'); 
        setPeople(response.data);
      } catch (error) {
        console.error("There was an error fetching the people!", error);
      }
    };
    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL + `contacts/people/${id}`);
      setPeople(people.filter(person => person.id !== id));
    } catch (error) {
      console.error("There was an error deleting the person!", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        People List
      </Typography>
      <Grid container spacing={2}>
        {people.map(person => (
          <Grid item xs={12} sm={6} md={4} key={person.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{person.name}</Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      component={Link}
                      to={`/person/${person.id}`}
                      variant="contained"
                      color="primary"
                      startIcon={<Visibility />}
                    >
                      View
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      to={`/edit-person/${person.id}`}
                      variant="contained"
                      color="secondary"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(person.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/add-person"
            variant="contained"
            color="success"
            startIcon={<Add />}
          >
            Add Person
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PeopleList;
