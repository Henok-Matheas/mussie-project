import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../../config";
import { User } from "./user.model";

//create token
const createToken = ({
  _id,
  firstName,
  lastName,
  email,
  role
}) => {
  return jwt.sign({
    _id,
    firstName,
    lastName,
    email,
    role
  }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
//login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//sign up
export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      role
    );

    //create a token
    const token = createToken({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user by ID
export const getUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const _id = res.locals.user._id;
    const user = await User.findById(_id, { password: 0 });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//delete a single user
export const deleteUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id } = req.params;
    const user = await User.deleteOne({ _id });
    if (!user) {
      return res.status(400);
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};