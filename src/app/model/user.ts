/*
  Ideally this class would also contain the Friend/Contact list which contains details about them
  but I am skipping that for this exercise
 */
export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
}

export class User implements IUser {
  constructor(public id: number, public name: string, public username: string, public password: string) {
  }
}
