export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    personalCode: string;
    dateOfBirst: string; // birth, i know, but i very don't wanna delete database on server again((
    phoneNumber: string;
    eMail: string;
    flatId: number;
}
export class DefaultTenant {
    id: number = null;
    firstName = '';
    lastName = '';
    personalCode = '';
    dateOfBirst = ''; // birth, i know, but i very don't wanna delete database on server again((
    phoneNumber = '';
    eMail = '';
    flatId: number = null;
}
