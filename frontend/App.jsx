import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Listing from './Listing.jsx'

function App() {
  const [addClick, setAddClick] = useState(false)
  const [listings, setListings] = useState([{location: "Gaza", rental: 1109},
                                            {location: "World Trade Centre", rental: 2001}])

  function editSave(newData, index){
    const tempList = listings.map((listing, i)=>{
      if(i===index){
        return newData
      }
      else{
        return listing
      }
    })

    setListings(tempList)
  }

  function createNew(childData){
    setListings([...listings, childData])
  }

  return (
  <>
  <>{listings.map((listing,i)=><ul><Listing listing={listing} addNew={false} index={i} action={editSave}></Listing>
  </ul>)}</>
  {addClick?(
  <>
    <Listing addNew={true} action={createNew}></Listing>
    
  </>):(
  <>
    <button onClick={()=>{setAddClick(!addClick)}}>Add New Listing</button>
  </>)


  }
  
  </>

  )
}

export default App
