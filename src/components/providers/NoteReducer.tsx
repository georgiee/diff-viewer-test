import { Note } from '../../types';

export const initialState: Note[] = []

let DRAFT_COUNTER = 0

const createDraftAnnotation = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: "annotation"
})

export const noteReducer = (state, action) => {
  switch (action.type) {
 
    case "ADD_NOTE":
      return state.concat(action.note)

    case "UPDATE_NOTE": 
      return state.map((item) => {
        if (item.id === action.note.id) {
          return {
            ...action.note
          };
        }

        return item;
      });
    
      case "DELETE_NOTE":
      return state.filter((item) => item.id !== action.id);

    case "DELETE_DRAFT_NOTE":
      return state.filter((item) => item.id !== action.id);

    case "FETCH_SUCCESS":
      return [...action.notes]

    case "ADD_DRAFT_NOTE":
      return state.concat(createDraftAnnotation(action.locator))
    
    default:
      throw new Error();
  }
}
