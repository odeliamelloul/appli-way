import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const SearchBox = ({history}) => {
    const [keyword, setKeyWord] = useState('')

    const submitHandler = (e) => {
       e.preventDefault()
       if(keyword.trim())
       {
         history.push(`/search/${keyword}`)
       }
       else{
           history.push("/Catalog")
       }
      }

    return (
    <form  onSubmit={submitHandler}   className="search-Box">
        <input  onChange={(e)=>setKeyWord(e.target.value)}  className="form-control" type="Search"  placeholder="חפש..." aria-label="Search"/>
        <button className='serch-box-btn' type='submit' style={{border:"none",backgroundColor:"transparent"}} >
         <img srcset="https://img.icons8.com/windows/22/search--v1.png" alt="icon" loading="lazy"/>
        </button> 
    </form>

    )
}

export default SearchBox
