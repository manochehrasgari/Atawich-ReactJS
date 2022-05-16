export const Validate = (data,type)=>{


const errors = {}

if (type === "signup") {
    
    if (!data.name.trim()) {
        errors.name = "لطفا نام خود را وارد کنید"
    }else {
        delete errors.name
    }

    if (!data.email) {
        errors.email = 'email requied'
    }else if(!data.email.includes('@')){
        errors.email = 'email is Not valid'
    }else {
        delete errors.email
    }



    if (!data.password) {
        errors.password = 'password requied'
    }else if(data.password.length < 8){
        errors.password = 'password need to be 8 character or more'
    }else {
        delete errors.password
    }



    if (!data.confirmPassword) {
        errors.confirmPassword = 'confirmPassword requied'
    }else if(data.confirmPassword !== data.password){
        errors.confirmPassword = 'confirmPassword mosavi nist ba password'
    }else {
        delete errors.passwordconfirmPassword
    }


    if (!data.isAccepted) {
        errors.isAccepted = "qavanin ra taeid konid"
    }else {
        delete errors.isAccepted
    }

    return errors

} 


if (type === "login") {
    if (!data.email) {
        errors.email = 'email requied'
    }else if(!data.email.includes('@')){
        errors.email = 'email is Not valid'
    }else {
        delete errors.email
    }



    if (!data.password) {
        errors.password = 'password requied'
    }else {
        delete errors.password
    }

    return errors
}





}