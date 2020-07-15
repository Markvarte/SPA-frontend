export interface House {
    id: number;
    num: number;
    street: string;
    sity: string; // city, i know, but i very don't wanna delete database on server again((
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
