import {createContext, ReactNode, useContext, useState} from 'react'

interface Episode{
    title:string;
    members:string;
    thumbnail:string;
    duration:number;
    url:string;
}

interface PlayContextData{
    episodeList:Episode[];
    currentEpisodeIndex:number;
    isPlaying:boolean;
    hasPrevious:boolean;
    hasNext:boolean;
    isLooping:boolean;
    isShuffling:boolean;
    play: (episode:Episode)=> void;
    playNext:()=>void;
    playPrevious:()=>void;
    togglePlay:()=>void;
    toggleLoop:()=>void;
    toggleShuffle:()=>void;
    clearPlayState:()=>void;
    setPlayingState:(state:boolean)=>void;
    playList:(list:Episode[],index:number)=>void;

} 
interface PlayerContextProviderProps{
  children: ReactNode;

}

export const PlayerContext = createContext({} as PlayContextData);

export function PlayerContextProvider({children}:PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)
    function play(episode:Episode){
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }
    function toggleLoop()
    {
      setIsLooping(!isLooping);
    }
    function toggleShuffle()
    {
      setIsShuffling(!isShuffling);
    }
    function setPlayingState(state:boolean){
      setIsPlaying(state);
    }
    function playList(list: Episode[],index:number){
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
    function clearPlayState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext     = isShuffling || (currentEpisodeIndex +1) < episodeList.length
    function playNext(){    
      if (isShuffling){
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length )
        setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      }
      else if(hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }
    function playPrevious(){
      if(hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }
      
    
    return(
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            isLooping,
            isShuffling,
            togglePlay,
            toggleLoop,
            toggleShuffle,
            setPlayingState,
            playList,
            playNext,
            playPrevious,
            hasPrevious,
            hasNext,
            clearPlayState
      
        }}>
            {children}
        </PlayerContext.Provider>

    )
}

export const usePlayer = ()=>{
  return( useContext(PlayerContext) )
}