// import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel"); // Fix: Change 'comment' to 'Like' to match the model name

// like a post
exports.likepost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const like = new Like({
            post,
            user,
        });
        const savedLike = await like.save();
        
        // Fix: Correct the syntax of the update operation
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true }).populate("likes").exec();

        res.json({
            post: updatedPost,
        });

    } catch (error) {
        return res.status(400).json({
            error: "Error while fetching data",
        });
    }
};

// unlike a post.
exports.unlikePost = async(req,res)=>{

    try{
        // find and delete the like collection ma se.
        const deletedLike = await  Like.findOneAndDelete({post:Post, _id:Like});

        // update the post collection
        const updatedPost = await Post.findByIdAndDelete(Post , {$pull: {Likes: deletedLike._id}} , {new : true});

        res.json({
            post:updatedPost,
        });


    }
    catch(error){
        return res.status(400).json({
            error: "Error while fetching data",
        });

    }
}
