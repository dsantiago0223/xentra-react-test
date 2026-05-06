export interface Account {
  dob: string;
  emailAddress: string;
  firstName: string;
  guid: string;
  id: number;
  lastName: string;
  middleName: string;
  mobileNumber: string;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  state: string;
  zip: string;
}

export interface User {
  account: Account;
  address: Address;
}

export interface UserResponse extends User {
  message: string;
  token: string;
}

export interface BalanceResponse {
  balance: string;
  message: string;
}