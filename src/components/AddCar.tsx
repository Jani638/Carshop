import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { AddCarProps } from '../types';

export default function addCar(props: AddCarProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const carData = Object.fromEntries((formData as any).entries());
    const car = { brand: carData.brand,
                  color: carData.color,
                  fuel: carData.fuel,
                  model: carData.model,
                  modelYear: Number(carData.modelYear),
                  price: Number(carData.price)
                };
    props.handleAdd(car)
    handleClose();
  };

  return (
    <React.Fragment>
        <Button variant="outlined" 
        onClick={() => handleClickOpen()}>
          Add car
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="brand"
              name="brand"
              label="Brand"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="color"
              name="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="fuel"
              name="fuel"
              label="Fuel"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="model"
              name="model"
              label="Model"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="modelYear"
              name="modelYear"
              label="Model Year"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}