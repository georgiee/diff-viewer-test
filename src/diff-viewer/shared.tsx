import { MutableRefObject } from 'react';

export interface NoteComponentInterface {
  locator: any
  addDraftFnRef: MutableRefObject<any>
}

export interface GutterComponentInterface {
  locator: any
  toggleLineContentFnRef: MutableRefObject<any>
}
