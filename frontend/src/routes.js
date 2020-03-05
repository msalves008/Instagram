import { Switch, Routes} from 'react-router-dom'

import Feed from './pages/Feed'
import New from './pages/New'
//video 14:40
function Routes(){
    return(
        <Route path= "/" component={Feed}/>
        <Route path= "/new" component={New}/>

    )
}