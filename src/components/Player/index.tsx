import Image from 'next/image'
import Head from 'next/head'
import { useContext, useRef ,useEffect, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css' 
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null) //acessar elementos html -> audio
    const [progress, setProgress] = useState(0)

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        isLooping,
        isShuffling,
        playNext,
        playPrevious, 
        toggleLoop,
        toggleShuffle,
        hasNext,
        hasPrevious,
        togglePlay, 
        setPlayingState,
        clearPlayerState,
    } = useContext(PlayerContext)

    useEffect(() => {
        if(!audioRef.current) {
            return
        }
        if(isPlaying){
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying]) 

    function setupProgressListener() {
        audioRef.current.currentTime = 0

        //retorna o tempo atual do player 
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number){
        audioRef.current.currentTime = amount
        setProgress(amount)
    }

    function handleEpisodeEnded(){
        if(hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.playerContainer}>
            {/* tudo que tiver no head vai ser colocado no head do html pra cada pagina */}
            <Head>
                <title>Home | Podcaster</title>
            </Head>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora {episode?.title}</strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>

            ) : (
                <div className={styles.emptyPlayer}>
                   <strong>Selecione um podcast para ouvir</strong>
               </div>
   
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div  className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{backgroundColor: '#04d361'}}    
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{borderColor: '#9f75ff', borderWidth: 4}}
                            />
                        ) : (
                            <div className={styles.emptySlider}></div>
                        )}
                        
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {/* if verdadeiro &&  */}
                { episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onEnded={handleEpisodeEnded}
                        onPlay={() => setPlayingState(true)} //pega o evento do teclado
                        onPause={() => setPlayingState(false)} //pega o evento do teclado f8
                        onLoadedMetadata={setupProgressListener}
                    />
                )} 



                <div className={styles.buttons}>
                    <button 
                        type="button" 
                        disabled={!episode || episodeList.length == 1}
                        onClick={toggleShuffle}
                        className={isShuffling? styles.isActive : ''}
                        >
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/play-previous.svg" alt="Tocar Anterior"/>
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        {
                            isPlaying 
                            ? (<img src="/pause.svg" alt="Pausar"/>) 
                            : (<img src="/play.svg" alt="Tocar"/>)
                        }
                        
                    </button>
                    <button type="button"  onClick={playNext} disabled={!episode || !hasNext}>
                        <img src="/play-next.svg" alt="Tocar pr??xima"/>
                    </button>
                    <button 
                        type="button" 
                        onClick={toggleLoop} 
                        disabled={!episode} 
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>

        </div>
    )
}

//tudo que esta na pasta public nao precisa ser importado