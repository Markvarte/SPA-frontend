export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    personalCode: string;
    dateOfBirst: string; // Birth, i know, but i very don't wanna delete database on server again((
    phoneNumber: string;
    eMail: string;
    flatId: number;
    houseId: number; // Needed for navigation back to Flat list
}
export class DefaultTenant implements Tenant {
    id: number = null;
    firstName = '';
    lastName = '';
    personalCode = '';
    dateOfBirst = ''; // Birth, i know, but i very don't wanna delete database on server again((
    phoneNumber = '';
    eMail = '';
    flatId: number = null;
    houseId: number = null;
}
