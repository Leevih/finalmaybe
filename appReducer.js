
  const appReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        {
          return {
            ...state,
            allItems: action.payload
          }
        }
      case 'SET_RECEIPTS':
        {
          return {
            ...state,
            allReceipts: action.payload
          }
        }
      case 'ADD_THIS':
        {
          return {
            ...state,
            selectedItems: state.selectedItems.concat(action.payload),
          }
        }
      case 'REMOVE_THIS':
        {
          const index = state.selectedItems.findIndex(item => { return item.key === action.payload.key; })
          const newArray = [...state.selectedItems]
          if(index !== -1){
            newArray.splice(index, 1)
          }
          return {
            ...state,
            selectedItems: newArray
          }
        }
      case 'SET_TOTAL':
        {
          return {
            ...state,
            selectedTotal: state.selected.reduce((acc, obj) => acc + obj.price, 0)
          }
        }
      case 'ADD_NEW_ITEM':
        {
          return {
            ...state,
            allItems: state.allItems.concat(action.payload)
          }
        }
      case 'REMOVE_THIS_FROM_ALL':
        {
          const newArray = state.allItems.filter(item => item._id !== action.payload._id)
          return {
            ...state,
            allItems: newArray
          }
        }
      case 'SET_SELECTED_RECEIPT':
        {
          return {
            ...state,
            singleReceipt: action.payload,
          }
        }
      default: {
        return state;
      }
    }
  }

export default appReducer