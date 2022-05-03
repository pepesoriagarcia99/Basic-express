import mongooseKeywords from 'mongoose-keywords'

import crypto from "crypto"
import bcrypt from 'bcrypt'

import { DocumentType, getModelForClass, modelOptions, plugin, pre, prop } from "@typegoose/typegoose";


export const roles = ['user', 'guest', 'admin']

@pre<User>('save', function (next) {  
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 9).then((hash: string) => {
      this.password = hash
      next()
    }).catch(next)
  }

  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(this.email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }
})

@plugin(mongooseKeywords, { paths: ['email', 'name'] })
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
class User {

  @prop({
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  })
  public email: string

  @prop({
    type: String,
    required: true,
    minlength: 6
  })
  public password: string

  @prop({
    type: String,
    required: true
  })
  public name: string

  @prop({
    type: String,
    required: true,
    enum: roles,
    default: 'user'
  })
  public role: string

  @prop({
    type: String
  })
  public picture: string


  constructor({ email, password, name, role, picture }: any) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.picture = picture;
  }

  public view(this: DocumentType<User>) {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      picture: this.picture
    }
  }

  public authenticate(password: string): Promise<User | boolean> {
    return bcrypt.compare(password, this.password).then((valid: boolean) => valid ? this : false)
  }
}

export const userModel = getModelForClass(User)
export default userModel
