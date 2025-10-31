import { useEffect, useState } from "react";
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddCar from "./AddCar.tsx";
import EditCar from "./EditCar.tsx";

import type { Tcar } from "../types";

export default function CarList() {
    const [cars, setCars] = useState<Tcar[]>([]);

    const columns: GridColDef[] = [
  { field: 'brand', headerName: 'Brand', flex: 1},
  { field: 'color', headerName: 'Color', flex: 1 },
  { field: 'fuel', headerName: 'Fuel', flex: 1 },
  { field: 'model', headerName: 'Model', flex: 1},
  { field: 'modelYear', headerName: 'Year', flex: 0.5 },
  { field: 'price', headerName: 'Price', flex: 0.5},
  { field: 'actions', flex: 1, 
    type: 'actions',
    width: 150,
    getActions: (params: GridRowParams) => [
        <EditCar handleUpdate={handleUpdate} url={params.row._links.self.href} currentCar={params.row}/>,
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
            throw new Error(`Failed deleting car: ${response.statusText}`);
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


const handleUpdate = async (url: string, car: Tcar) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }

        const response = await fetch(url, options);
                if (!response.ok) {
            throw new Error(`Failed to edit car: ${response.statusText}`);
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