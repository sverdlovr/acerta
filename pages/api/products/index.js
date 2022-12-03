import fs from 'fs';
import path from 'path'
import { products } from '../../../data/products'

function handler(req, res){
    if(req.method == "GET"){
        return res.status(200).json(products);
    }else if(req.method === "POST"){ // handle post request here
         
    }
}

export default handler;