const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return state.concat([action.data]);
    case "DELETE_POST":
      return state.filter((post) => post.id !== action.id);
    case "EDIT_POST":
      return state.map((post) =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
    case "UPDATE":
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            name: action.data.name,
            email: action.data.email,
            phone: action.data.phone,
            address: action.data.address,
            streetAddress: action.data.streetAddress,
            city: action.data.city,
            state: action.data.state,
            country: action.data.country,
            pinCode: action.data.pinCode,
            gender: action.data.gender,
            hobbies: action.data.hobbies,
            editing: !post.editing,
          };
        } else return post;
      });
    case "LOAD_POSTS":
      return action.posts;
    default:
      return state;
  }
};

export default postReducer;
