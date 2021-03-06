const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
      pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true // Retire les blancs en début et fin de chaîne de caractères
      },
      email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
      },
      picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
      },
      bio :{
        type: String,
        max: 1024,
      },
      followers: {
        type: [String]
      },
      following: {
        type: [String]
      },
      likes: {
        type: [String]
      }
    },
    {
      timestamps: true,
    }
  );

  // play function before save into DB
  userSchema.pre("save", async function(next) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
  });

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;