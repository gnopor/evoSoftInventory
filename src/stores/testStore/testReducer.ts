const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ANNONCES":
      return { ...state, annonces: action.annonces };

    default:
      throw new Error(`Unsupported type: ${action?.type}`);
  }
};

// -----------------------------------------------------------
const initialState = {
  annonces: [],
};

export { reducer, initialState };
