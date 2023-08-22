const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

exports.createUser = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    return res.status(201).send({ message: "User already exists!" });
  } else {
    const hashedpassword = bcrypt.hashSync(req.body.password, 12);
    req.body["password"] = hashedpassword;

    const user = new User(req.body);

    try {
      const doc = await user.save();

      const accessToken = jwt.sign(
        { userInfo: { _id: doc.id, role: doc.role, email: doc.email } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      const refreshToken = jwt.sign(
        { userInfo: { _id: doc.id, role: doc.role, email: doc.email } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "14d" }
      );

      res.cookie("jwt", refreshToken, {
        withCredentials: true,
        secure: true,
        sameSite: "none",
        httpOnly: true, // accessible only by browser
        maxAge: 14 * 24 * 60 * 60 * 1000, //after 14  day cookie will authometically deleted from the browser
      });

      res
        .status(201)
        .json({ id: doc.id, role: doc.role, accessToken: accessToken });
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

exports.loginUser = async (req, res) => {
  console.log("Login request executed!");
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404).json({ message: "email and password not found." });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        // generating access token
        const accessToken = jwt.sign(
          { userInfo: { _id: user._id, role: user.role, email: user.email } },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
          { userInfo: { id: user.id, email: user.email } },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("jwt", refreshToken, {
          withCredentials: true,
          secure: true,
          sameSite: "none",
          httpOnly: true, // accessible only by browser
          maxAge: 14 * 24 * 60 * 60 * 1000, //after 14  day cookie will authometically deleted from the browser
        });

        res
          .status(200)
          .json({ id: user.id, role: user.role, accessToken: accessToken });
      } else {
        res.status(401).json({ message: "invalid credential!" });
      }
    });
  } catch (err) {
    res.status(401).json({ message: "invalid credential!" });
  }

  // this is the previous login

  // try {
  //   const user = await User.findOne({ email: req.body.email }).exec();
  //   // TODO: this is just temporary, we will use strong password auth
  //   console.log({ user });
  //   if (!user) {
  //     res.status(401).json({ message: "no such user email" });
  //   }

  //   if (user.password === req.body.password) {
  //     // TODO: We will make addresses independent of login
  //     res.status(200).json({ id: user.id, role: user.role });
  //   } else {
  //     res.status(401).json({ message: "invalid credentials" });
  //   }
  // } catch (err) {
  //   res.status(400).json(err);
  // }
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "Unathorized for token refreshing" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        res
          .status(403)
          .json({ message: "unathorized request for refresh token" });
      }

      const foundUser = await User.findOne({ email: decoded.userInfo.email });

      if (!foundUser) return res.status(401).json({ message: "Unathorized" });

      const accessToken = jwt.sign(
        {
          userInfo: {
            _id: foundUser._id,
            email: foundUser.email,
            name: foundUser.name,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      res.json({ accessToken });
    }
  );
};

exports.Logout = async (req, res) => {
  console.log("User logged Out! ");

  res
    .cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .send({ message: "success" });
};
