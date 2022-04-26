import React, { useState,useEffect } from "react";
import useBreedList from "./useBreedList";
import Pet from "./Pet";
import ThemeContext from "./ThemeContext";

const ANIMAL= ["bird", "cat","dog","rabbit", "reptiles"];
const SearchParams=()=>{
     
    const [location, setLocation]=useState('');
    const [animal, setAnimal]= useState('');
    const [breed, setBreed] = useState('');
    const [pets, setPets]=useState([]);
    const [isLoading, setIsloading]=useState(true)
    const [error, setError]= useState(null)
    const [breeds] = useBreedList(animal)
    const [theme, setTheme]= useState(ThemeContext)

    function handleChange(e){
      setLocation(e.target.value);
    }
    
    useEffect(() => {
      requestPets().catch(err=>{
          setIsloading(false);
           setError(err.message)
           }) ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []); 
  
    
    async function requestPets() {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        if(!res.ok){
          const message= ('could not fetch the data from the resources')
         throw new Error(message);
        }
     const json = await res.json() 
     setPets(json.pets);
     setIsloading(false);
    }
return(
 <div className="search-params">
       <form onSubmit={e=>{
         e.preventDefault();
         requestPets();
       }
      }>
           <label htmlFor="location">
           Location
           <input value={location} placeholder="location"  onChange={handleChange}/>
           </label>
           
           <label htmlFor="animal">
            ANIMAL
            <select id="animal"
             value={animal}
             onChange={(e)=>setAnimal(e.target.value)} 
            onBlur={(e)=>setAnimal(e.target.value)}>
                {ANIMAL.map(animal=>(
                  <option value={animal} key={animal}>{animal}</option>
                ))}
            </select>    
           </label>
           <label htmlFor="animal">
            BREED
            <select id="breed"
             value={breed}
             onChange={(e)=>setBreed(e.target.value)} 
            onBlur={(e)=>setBreed(e.target.value)}>
                {breeds.map(breed=>(
                  <option value={breed} key={breed}>{breed}</option>
                ))}
            </select>    
           </label>
           <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
           
           </form>
           {error && <h2>{error}</h2>} 
           {isLoading && <h1>Loading......</h1>}
          <div className="search"> 
            {pets.map(pet=>(
           <Pet name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
            images={pet.images}
            location= {`${pet.city},${pet.state}`}
            id={pet.id}/>))}
           </div>
   </div>
    );
}

export default SearchParams;
