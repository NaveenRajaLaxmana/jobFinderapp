import React,{useState} from 'react'

const Search = ({samplejobs,setSamplejobs}) => {
    const [searchposition,setposition] = useState('');
    const [searchlocation,setsearchLocation] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        if(searchposition != ''){
            
            let filtered = samplejobs.filter(job => job.position === searchposition && job.location === searchlocation);
            setSamplejobs(filtered)
           
        }
    }
    return (
        <div className="search-jobs">
            <form onSubmit={submitHandler}>
            <input type="text" placeholder="job title,keywords" value={searchposition} onChange={e => setposition(e.target.value)} className="input-box"/>
            <input type="text" placeholder="Location" value={searchlocation} onChange={e => setsearchLocation(e.target.value)} className="input-box"/>
            <button type="submit" className="search-button">Find Jobs</button>
            </form>
        </div>
    )
}

export default Search
