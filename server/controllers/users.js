import User from "../models/userModel.js";

/* READ */
export const getUser = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
};

export const getUserFriends = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );
    response.status(200).json(formattedFriends);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (request, response) => {
  try {
    const { id, friendId } = request.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );

    response.status(200).json(formattedFriends);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
};
