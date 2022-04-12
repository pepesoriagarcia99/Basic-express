import crypto from "crypto";
import mongoose from "mongoose";

export enum UserRoles {
  user = 'user',
  admin = 'admin'
}

export type UserDocument = mongoose.Document & {
  id: string
  email: string
  password: string
  name: string
  orgUnit: string
  role: UserRoles
  picture: string

  gravatar: (size: number) => string
  view: () => userEntry
}

export type login = Pick<UserDocument, 'email' | 'password'>
export type userEntry = Pick<UserDocument, 'id' | 'email' | 'name' | 'orgUnit' | 'role' | 'picture'>

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  orgUnit: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods = {
  gravatar(size: number = 200): string {
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex")
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
  },
  view(): userEntry {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      orgUnit: this.orgUnit,
      role: this.role,
      picture: this.picture
    }
  }
}

export const User = mongoose.model<UserDocument>("User", userSchema)
