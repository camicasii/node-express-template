import { Schema ,model } from 'mongoose';
const ObjectId = Schema.ObjectId;
const BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
  });
  const User = new Schema({    
    username: String,
    password: String    
  });
const Comment = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
  });


  /*export default {
    BlogPost:model("BlogPost", BlogPost), 
    Comment:model("Comment",Comment),
    User: model("User",User) }*/

export const User_ = model("User",User);
export const BlogPost_ = model("BlogPost", BlogPost);
export const Comment_ = model("Comment",Comment);
    