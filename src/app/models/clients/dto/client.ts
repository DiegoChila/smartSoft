export class Client {
  id: number;
  completeName: string;
  address: string;
  birthday: string;
  tel: string;
  email: string;
  invoicesNum: number;

  constructor(id: number, completeName: string, address: string, birthday: string, tel: string, email: string, invoicesNum: number) {
    this.id = id;
    this.completeName = completeName;
    this.address = address;
    this.birthday = birthday;
    this.tel = tel;
    this.email = email;
    this.invoicesNum = invoicesNum;
  }
}
