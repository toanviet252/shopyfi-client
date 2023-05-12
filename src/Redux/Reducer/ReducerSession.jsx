const initialState = {
  idUser: '',
  isAuth: false,
};

const ReducerSession = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SESSION':
      console.log(action);
      return {
        ...state,
        isAuth: true,
        idUser: action.data,
      };

    case 'DELETE_SESSION':
      console.log(action);
      return {
        ...state,
        isAuth: false,
        idUser: action.data,
      };

    default:
      return state;
  }
};

export default ReducerSession;
