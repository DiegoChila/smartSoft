import { Client } from "./client";

export class NewClient {
  success: boolean;
  client: Client;
  errors: string[];

  constructor(success: boolean, client: Client, errors: string[]) {
    this.success = success;
    this.client = client;
    this.errors = errors;
  }
}
