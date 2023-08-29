import generateToken from "../Config/generateToken.js";
import { validateMongodbId } from "../Config/validateMongodbId.js";
import userModel from "../Models/userModel.js";

export const createUserController = async (req, res) => {
  const { email } = req.body;
  try {
    const foundEmail = await userModel.findOne({ email: email });
    if (foundEmail) {
      res.json({
        res: { message: "User Already Exists", success: false },
      });
    } else {
      const newUser = await userModel.create(req.body);
      res.json({
        registeredUser: newUser,
        res: { message: "User Registered Successfully", success: true },
      });
    }
  } catch (error) {
    res.json({
      res: { message: error, success: false },
    });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  //check wheather user exists or not
  const foundUser = await userModel.findOne({ email });

  if (foundUser && (await foundUser.isPasswordMatched(password))) {
    //Refresh Token
    // const refreshToken = await generateRefreshToken(foundUser?._id);
    // const updateUser = await userModel.findByIdAndUpdate(
    //   foundUser?._id,
    //   { refreshToken: refreshToken },
    //   { new: true }
    // );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 72 * 60 * 60 * 1000,
    // });

    res.json({
      userData: {
        _id: foundUser?._id,
        name: foundUser?.name,
        email: foundUser?.email,
        mobile: foundUser?.mobile,
        Token: generateToken(foundUser?._id),
      },
      res: {
        message: "Signed In Successfully",
        success: true,
      },
    });
  } else {
    res.json({ res: { message: "Invalid Credentials", success: false } });
  }
};

//Fetch A Single User
export const getAUserController = async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await userModel.findById({ _id: _id });
    res.json({
      gotUser: user,
      res: { message: "User got Successfully", success: true },
    });
  } catch (error) {
    res.json({
      res: { message: "Not Fetched", success: false },
    });
  }
};

//Delete A Single User
export const deleteAUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.json({
      res: { message: "Not Fetched", success: false },
    });
  }
};

//Update A User
export const updateAUserController = async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
      },
      {
        new: true,
      }
    );
    res.json({
      updatedUser,
      res: { message: "User Data is Updated Successfully", success: true },
    });
  } catch (error) {
    res.json({ res: { message: error, success: false } });
  }
};
