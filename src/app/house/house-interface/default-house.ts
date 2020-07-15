export interface House {
    id: number;
    num: number;
    street: string;
    country: string;
    postCode: string;
}
export class DefaultHouse {
    id: number = null;
    num: number = null;
    street = '';
    sity = '';
    country = '';
    postCode = '';
}
