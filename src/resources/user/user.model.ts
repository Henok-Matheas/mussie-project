import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import { UserRole } from "../../types/user";

export interface IUserInterface {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
interface userModel extends Model<IUserInterface> {
  signup(firstName, lastName, email, password, role?): IUserInterface;
  login(email, password): IUserInterface;
}
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: [UserRole.user, UserRole.admin],
    default: UserRole.user,
  },
});

// static sign up
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  role = "user"
) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("There is another account with the same email!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    role,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials!");
  }
  return user;
};
export const User = mongoose.model<IUserInterface, userModel>(
  "User",
  userSchema
);
