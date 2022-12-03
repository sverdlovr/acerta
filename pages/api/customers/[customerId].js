import { preferences } from '../../../data/preferences'
import { products } from '../../../data/products'

function getProductName(customerPreferences){
    let cp = [...customerPreferences]

    if(cp.length > 0){

        cp.map((item)=>{
            let fruit = ''
            fruit = products.find(f => f.id == parseInt( item.productId ));
            item.productName = fruit.name;        
        })
    }

    return cp;
}

const handler = (req, res) => {
    
    const {customerId} = req.query

    if(req.method == 'GET'){ // finds all preferences by customer ID
       
        const customerPreferences = preferences.filter(
            preference => preference.customerId === parseInt(customerId)
        )
        if(customerPreferences.length > 0){

            const data = getProductName(customerPreferences)
            res.status(200).json(data)
        }else{
            res.status(200).json(null)            
        }
        
    }   
    

}

export default handler