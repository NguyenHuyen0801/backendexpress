const mongoose = require("../../common/database")();

const commentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    pro_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product", //tên bí danh trong model product
    },
    body: {
      type: String,
      default: null,
    },
    full_name: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;
