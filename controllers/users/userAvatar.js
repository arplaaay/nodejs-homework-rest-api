const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/users");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

// console.log(avatarDir);

const userAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;

    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;

    const readFile = await Jimp.read(tempUpload);
    const resizeFile = readFile.resize(250, 250);
    resizeFile.write(tempUpload);

    const result = path.join(avatarDir, avatarName);
    await fs.rename(tempUpload, result);
    const avatarURL = path.join("avatars", result);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    res.json(avatarURL);
  } catch (err) {
    await fs.unlink(req.file.path);

    res.json(err);
  }
};

module.exports = userAvatar;
