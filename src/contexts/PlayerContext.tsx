import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextDate = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episodes: Episode) => void;
  playList: (list: Episode[], index:number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  playNext: () => void;
  clearPlayerState: () => void;
  playPrevious: () => void;
  hasPrevious:  boolean;
  hasNext: boolean;
}

export const PlayerContext = createContext({} as PlayerContextDate);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({children} : PlayerContextProviderProps){

  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  
  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }
  
  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }
  
  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  //vai pro episodio mais antigo
  function playNext() {
   
    if(isShuffling){
      const nextRamdomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRamdomEpisodeIndex)
    } else if (hasNext)
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)    
  }

  //vai pro episodio mais recente
  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function clearPlayerState(){
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }
  
  return(
    <PlayerContext.Provider 
      value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        playList,
        playNext,
        playPrevious,
        isPlaying, 
        isShuffling,
        togglePlay, 
        setPlayingState,
        isLooping,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
        hasPrevious,
        hasNext}}>
      {children}
    </PlayerContext.Provider>
  )  
}


export const usePlayer = () => {
  return useContext(PlayerContext)
}
