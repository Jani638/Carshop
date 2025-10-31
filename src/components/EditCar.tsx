import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { EditCarProps } from '../types';

export default function editCar(props: EditCarProps) {
  const [open, setOpen] = React.useState(false);
  const [carForm, setCarForm] = React.useState(props.currentCar)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarForm({ ...carForm, [event.target.name]: event.target.value})
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
    props.handleUpdate(props.url, car)
    handleClose();
  };

  return (
    <React.Fragment>
        <Button onClick={() => handleClickOpen()}>
          Edit
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
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
              onChange={handleChange}
              value={carForm.brand}
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
              onChange={handleChange}
              value={carForm.color}
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
              onChange={handleChange}
              value={carForm.fuel}
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
              onChange={handleChange}
              value={carForm.model}
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
              onChange={handleChange}
              value={carForm.modelYear}
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
              onChange={handleChange}
              value={carForm.price}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}