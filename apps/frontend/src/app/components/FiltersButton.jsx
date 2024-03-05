'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

import styles from '../index.module.scss';

const initialState = {
  minPrice: '',
  maxPrice: '',
  city: '',
  district: '',
  search: '',
};

export default function FiltersButton({ handleSubmit }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(initialState);

  const handleChange = (e, type) => {
    setFilters({ ...filters, [type]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFilters(initialState);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filters
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Set your filters:</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <span className={styles.filter}>
              <span>Price:</span>
              <TextField
                label="min..."
                variant="standard"
                size="small"
                value={filters.min}
                onChange={(e) => {
                  handleChange(e, 'minPrice');
                }}
              />
              <TextField
                label="max..."
                variant="standard"
                size="small"
                value={filters.max}
                onChange={(e) => {
                  handleChange(e, 'maxPrice');
                }}
              />
            </span>
            <span className={styles.filter}>
              <span>City:</span>
              <TextField
                label="city..."
                variant="standard"
                size="small"
                value={filters.city}
                onChange={(e) => {
                  handleChange(e, 'city');
                }}
              />
            </span>
            <span className={styles.filter}>
              <span>Distict:</span>
              <TextField
                label="district..."
                variant="standard"
                size="small"
                value={filters.district}
                onChange={(e) => {
                  handleChange(e, 'district');
                }}
              />
            </span>
            <span className={styles.filter}>
              <span>Search:</span>
              <TextField
                label="search..."
                variant="standard"
                size="small"
                value={filters.search}
                onChange={(e) => {
                  handleChange(e, 'search');
                }}
              />
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">
            Close
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit(filters);
            }}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
