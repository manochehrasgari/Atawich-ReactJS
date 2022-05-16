

export const initialState = {
    selectedItems: [],
    totalPrice : 0 ,
    counter : 0,
    checkOut : false
}


export const reducer = (state,action)=>{

    switch (action.type) {
        case "ADD":
            const newItems = [...state.selectedItems]
            const index = state.selectedItems.find(item => item.id === action.payload.id)
            if (!index) {
                newItems.push({...action.payload,quantity:1})
                state.counter = state.counter + 1

                state.totalPrice = state.totalPrice + action.payload.price 
            }
            return {
                ...state,
                selectedItems:newItems,
                checkOut: false
            }

        case "REMOVE":
                const filterItems = state.selectedItems.filter(item => item.id !== action.payload.id) 
    
                state.counter = state.counter - 1
    
                state.totalPrice = state.totalPrice - action.payload.price 
    
            return {...state , selectedItems : [...filterItems]}
        
        case "INCREASE" :
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id)
            state.selectedItems[indexI].quantity++

            state.counter = state.counter + 1

            state.totalPrice = state.totalPrice + state.selectedItems[indexI].price

        return {...state}   
        case "DECREASE":
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexD].quantity--;

            state.counter = state.counter - 1

            state.totalPrice = state.totalPrice - state.selectedItems[indexD].price

        return {...state,} 
        
        case "CHECKOUT" :

            return {
                selectedItems: [],
                counter: 0,
                totalPrice: 0,
                checkOut: true
            }

        case "CLEAR":

            return {
                selectedItems: [],
                counter: 0,
                totalPrice: 0,
                checkOut: false
            }


        default:
            return {...state}
           
    }



}


