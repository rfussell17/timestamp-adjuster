export type FormState = {
    additionalTime: string;
    showNotes: string;
    adjustedShowNotes: string;
    addTime: boolean;
    formatWithLeadingZeros: boolean;
  };
  
  export type FormAction =
    | { type: 'SET_ADDITIONAL_TIME'; payload: string }
    | { type: 'SET_SHOW_NOTES'; payload: string }
    | { type: 'SET_ADJUSTED_SHOW_NOTES'; payload: string }
    | { type: 'TOGGLE_ADD_TIME' }
    | { type: 'TOGGLE_FORMAT' };
  
  export const initialState: FormState = {
    additionalTime: "",
    showNotes: "",
    adjustedShowNotes: "",
    addTime: true,
    formatWithLeadingZeros: true,
  };
  
  export const reducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case 'SET_ADDITIONAL_TIME':
        return { ...state, additionalTime: action.payload };
      case 'SET_SHOW_NOTES':
        return { ...state, showNotes: action.payload };
      case 'SET_ADJUSTED_SHOW_NOTES':
        return { ...state, adjustedShowNotes: action.payload };
      case 'TOGGLE_ADD_TIME':
        return { ...state, addTime: !state.addTime };
      case 'TOGGLE_FORMAT':
        return { ...state, formatWithLeadingZeros: !state.formatWithLeadingZeros };
      default:
        return state;
    }
  };
  