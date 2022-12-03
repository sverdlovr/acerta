import { customers } from '../../../data/customers' 

export default function handler(req, res){
    if(req.method == "GET"){
        res.status(200).json(customers)
    }
}