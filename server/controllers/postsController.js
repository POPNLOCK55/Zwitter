import Post from '../models/postModel.js';
import User from '../models/userModel.js';

/* CREATE */
export const createPost = async (request, response) => {
    try {
        const { userId, description, picturePath } = request.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        response.status(201).json(post);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

/* READ */
export const getFeedPosts = async (request, response) => {
    try{
        const post = await Post.find();
        response.status(200).json(post);
    }catch(error){
        response.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (request, response) => {
    try{
        const { userId } = request.params;
        const post = await Post.find({ userId });
        response.status(200).json(post);
    }catch(error){
        response.status(404).json({ message: error.message });
    }
}

/* UPDATE */
export const likePost = async (request, response) => {
    try {
        const { id } = request.params;
        const { userId } = request.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if ( isLiked ) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id,
            { likes: post.likes },
            { new: true }
        );
        response.status(200).json("Post has been updated:", updatedPost);

    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}

