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