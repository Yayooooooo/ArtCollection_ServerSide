let mongoose = require("../routes/connectDB");

let Schema = mongoose.Schema;
let AudioSchema = new Schema({
    content: String,
    author: String,
    likes: [{type: Schema.Types.ObjectId, ref: "users"}]
},
{ collection: "audios"}
);

var Audio = mongoose.model("Audio", AudioSchema);
module.exports = Audio;

