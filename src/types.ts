export type Tcar = {
    brand: string;
    color: string;
    fuel: string;
    model: string;
    modelYear: number;
    price: number;
}

    export type AddCarProps = {
        handleAdd: (car: Tcar) => void;
    }

    export type EditCarProps = {
        url: string;
        currentCar: Tcar;
        handleUpdate: (url: string, car: Tcar) => void;
    }