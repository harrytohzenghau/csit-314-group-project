import { useState } from "react"

export default function Listing(props){
    const [addClick, setAddClick] = useState(props.addNew)
    const [editClick, setEditClick] = useState(false)
    const fields = ["Location", "Rental"]


    return(addClick?(
    <>
        <div className="listing">
            <ul><label>Location<input type="text"></input></label></ul>
            <ul></ul>

        </div>
    </>
    ):(<>
    <div className="listing">
        <ul>{props.listing.location}</ul>
        <ul>{props.listing.rental}</ul>
        {editClick?(<>
            <input></input>
            <button >Save</button>
            <button>Cancel</button>
        </>):(<>
            <button onClick={()=>{setEditClick(!editClick)}}>Edit</button>
        </>)

        }
        

    </div>
    
  
    </>)

    )
}