



export const quantity = (state,id)=>{
    const index = state.selectedItems.findIndex(item => item.id === id)
    let quan
    if (index >= 0) {
        quan = state.selectedItems[index].quantity
    }
    return quan
}

export const type = (state,id)=>{
    const index = state.selectedItems.findIndex(item => item.id === id)
    let typeAction
        if (index !== -1 ) {
            typeAction = "INCREASE"
        }else{
            typeAction = "ADD"
        }
    return typeAction
}


export const quanType = (state,id)=>{
    const index = state.selectedItems.findIndex(item => item.id === id)
    let quantity 
    if (index >= 0) {
        quantity = state.selectedItems[index].quantity
    }

    let quanSend
    if (quantity ===1 ) {

        quanSend = "REMOVE"

    }
    else if(quantity >= 1){

        quanSend = "DECREASE"
    }

    return quanSend
}
