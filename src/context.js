import React, { useEffect, useContext,useState } from "react";

export const API_URI = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// we need to create provide function

const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie,setMovie]= useState([]);
    const [isError, setIsError] = useState({ show: "false", msg:""});
    const [query, setQuery] = useState("avengers");

        const getMovies = async(url) => {
            try{
                const res = await fetch(url);
                const data = await res.json();
                console.log(data)
                if(data.Response === "True"){
                    setIsLoading(false);
                    setMovie(data.Search);
                    setIsError({
                        show:false,
                        msg:""
                    })

                }else{
                    setIsError({
                        show:true,
                        msg:data.Error
                    })
                }
            }catch(error){
                console.log(error);
            }
        }
        useEffect(() => {
          let timerout =  setTimeout(()=>{

                getMovies(`${API_URI}&s=${query}`);
            },1000 )

            return () => clearTimeout(timerout)
        },[query]);
    

    return <AppContext.Provider value={{isError,isLoading,movie,query,setQuery}}>{children}</AppContext.Provider>
};

// global custom hooks

const useGlobalContext = ()=> {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext}; 