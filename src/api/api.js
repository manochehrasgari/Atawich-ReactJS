import axios from 'axios'

const Base_Url = 'http://localhost:3001/products'

const getProducts = async () => {

    const response = await axios.get(Base_Url)
    return response.data
}


export {getProducts}