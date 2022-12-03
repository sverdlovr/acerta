import { preferences } from '../../../data/preferences'
import { products } from '../../../data/products'

const handler = (req, res) => {
    
    const { productId } = req.query
    
    if(req.method == 'GET'){ // get only those products that are not have been set as
        let customerProducts = [...products]
        const customerPreferences = preferences.filter(preference => preference.customerId === parseInt(productId))
        
        customerPreferences.map((item)=>{
            const index = customerProducts.findIndex(
                (cp) => item.productId === cp.id  
            )
            customerProducts.splice(index,1)       
        })
        res.status(200).json(customerProducts)
        
    }
    
    
}

export default handler