let mongoose = require("../routes/connectDB");

let Schema = mongoose.Schema;
let PoemSchema = new Schema({
        author: String,
        category: Number,
        background: String,
        likes: [{type: Schema.Types.ObjectId, ref: "users"}],
        title: String,
        createdTime: Date,
        comment_id: [{type: Schema.Types.ObjectId, ref: "comments"}],
        content: String,
        audioSrc: String,
        translation: String
    },
    {collection: "poetry"}
);

var Poem = mongoose.model("Poem", PoemSchema);
module.exports = Poem;

