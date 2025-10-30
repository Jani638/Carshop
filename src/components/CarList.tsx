import { useEffect, useState } from "react";
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddCar from "./AddCar";

import type { Tcar } from "../Types";

export default function CarList() {
    const [cars, setCars] = useState<Tcar[]>([]);

    const columns: GridColDef[] = [
  { field: 'brand', headerName: 'Brand' },
  { field: 'color', headerName: 'Color' },
  { field: 'fuel', headerName: 'Fuel' },
  { field: 'model', headerName: 'Model' },
  { field: 'modelYear', headerName: 'Year' },
  { field: 'price', headerName: 'Price' },
  { field: 'actions', 
    type: 'actions',
    width: 150,
    getActions: (params: GridRowParams) => [
        <Button size="small">Edit</Button>,
        <Button size="small" color="error" onClick={() => { handleDelete(params.id as string)}}>DELETE</Button>
    ]
  },
]


    const getCars = async () => {
        try {
        const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
        if (!response.ok) {
            throw new Error(`Failed to fetch cars: ${response.statusText}`);
        }
        const data = await response.json();
        setCars(data._embedded.cars);
    } catch (err) {
        console.log(err);
    }
}

 const handleDelete = async (url: string) => {
    try {
        const options = { 
            method: 'DELETE'
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to delete car: ${response.statusText}`);
        }
        getCars();
    } catch (err) {
        console.log(err);
    }
}

const handleAdd = async (newCar: Tcar) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        }

        const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options);
                if (!response.ok) {
            throw new Error(`Failed to add car: ${response.statusText}`);
        }
        getCars();


    } catch (err) {        
        console.log(err);

}

}

    useEffect(() => { getCars(); }, []);



    return (
        <div style={{ width: '90%', margin: '20px auto 0' }}>
            <AddCar handleAdd={handleAdd} />
            <div style={{ marginTop: '20px', height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                />
            </div>
        </div>
    )
}