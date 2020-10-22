let mongoose = require("../routes/connectDB");

let Schema = mongoose.Schema;
let AuthorSchema = new Schema({
    name: String,
    introduction: String,
    works: [String],
    likes: [{type: Schema.Types.ObjectId, ref: "users"}],
    gender:Boolean,
    language:Boolean,
    times:Boolean
},
{ collection: "author"}
);

var Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;

