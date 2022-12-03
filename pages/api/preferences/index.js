import { preferences } from '../../../data/preferences'
import { products } from '../../../data/products'


function getFruits(){
    return products;
}

function getData(){
    
    let data = preferences;
    
    data.map((item, index)=>{
        let fruit = products.find(f => f.id == item.productId);
        item.productName = fruit.name;        
    })

    return data;
}


function handler(req, res){
    
    if(req.method == "GET"){ 
        
    }else if(req.method === "POST"){
        const preference = req.body.newFruit
        const newPreference = {
            id: preference.id,
            customerId:preference.customerId,
            productId:preference.productId,
            atLeast: preference.atLeast,
            atMost: preference.atMost,
            updateAt:Date.now()
        }
        preferences.push(newPreference);

        const newPreferences = preferences.filter(
            p => p.customerId === parseInt(preference.customerId)
        )    
        res.status(201).json(newPreferences);
        
    }
}

export default handler;