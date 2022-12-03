
import { preferences } from '../../../data/preferences'

const handler = (req, res) => {
    
    const {preferenceId} = req.query
    
    if(req.method === 'GET'){
        
        const preference = preferences.find(preference => preference.id === parseInt(preferenceId))
        res.status(200).json(preference)
    
    }else if(req.method === 'PUT'){
        
        const editedPreference = req.body.editedPreference
        console.log(editedPreference)
        const index = preferences.findIndex((pref) => pref.id === parseInt(preferenceId))
        preferences[index].atLeast = parseInt( editedPreference.atLeast )
        preferences[index].atMost = parseInt( editedPreference.atMost )
        preferences[index].updatedAt = Date.now()
        
        res.status(200).json({success:"success"})
        }else if(req.method === 'DELETE'){
        
        const deletedPreference = preferences.find(preference => preference.id === parseInt(preferenceId))
        
        const index = preferences.findIndex(
            (preference) => preference.id === parseInt(preferenceId)
        )
        
        preferences.splice(index, 1)    
        res.status(200).json(deletedPreference)
    }
    
    
}

export default handler