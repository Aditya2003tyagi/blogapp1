// import model
const Post = require("../models/postModel");
const comment = require("../models/commentModel");

// bussiness logic
exports.createComment = async(req,res)=>{
    try{
        // fetch data from request body
        const{post, user, body} = req.body;
        // create a comment object
        const comment = new comment({
            post,user,body
        });

        // save the new comment into database
        const savedComment = await comment.save();

        // find the post by id,add the new comment to its comments array.
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}}, {new:true})
        // populate the comments array with comment documents.
        .populate("comments")
        .exec();
        res.json({
            post: updatedPost,
        })  
    }
    catch(error){
        return res.status(500).json({
            error: "Error while creating comment",
        })

    }
}