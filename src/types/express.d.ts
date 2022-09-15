import { Payload } from 'src/users/security/payload.interface';

declare global {
  namespace Express {
    export interface User extends Payload {}
  }
}
