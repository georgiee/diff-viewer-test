import { Note } from '../../types';

export const initialState: Note[] = []

let DRAFT_COUNTER = 0

const createDraftAnnotation = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: "annotation"
})

export const annotationReducer = (state, action) => {
  switch (action.type) {
 
    case "ADD_ANNOTATION":
      return state.concat(action.annotation)

    case "UPDATE_ANNOTATION": 
      return state.map((item) => {
        if (item.id === action.annotation.id) {
          return {
            ...action.annotation
          };
        }

        return item;
      });
    
      case "DELETE_ANNOTATION":
      return state.filter((item) => item.id !== action.id);

    case "DELETE_DRAFT":
      return state.filter((item) => item.id !== action.id);

    case "FETCH_SUCCESS":
      return [...action.annotations]

    case "ADD_DRAFT":
      return state.concat(createDraftAnnotation(action.locator))
    
    default:
      throw new Error();
  }
}
