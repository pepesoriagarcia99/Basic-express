import { ReturnModelType } from "@typegoose/typegoose";
import { User as AppUser } from './user.model'

declare global { 
  namespace  Express  { 
    export  interface  User extends ReturnModelType<typeof AppUser> { } 
  } 
}
