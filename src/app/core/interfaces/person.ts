export interface Person {
  id: number;
  uuid: string;
  name: string;
  lastname: string;
  birthdate: Date;
  phone: string;
  email: string;
}

export interface PersonAddress {
  id: number;
  userId: number;
  address: string;
  latitude: number;
  longitude: number;
}
