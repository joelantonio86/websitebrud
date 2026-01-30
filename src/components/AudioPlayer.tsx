import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  musicaCode: string;
  musicaTitle: string;
  hasMP3: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ musicaCode, musicaTitle: _musicaTitle, hasMP3 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Construir URL do MP3 (ajustar conforme necessário)
  const getAudioUrl = (code: string): string => {
    // Formato esperado: /musicas/{codigo}/audio.mp3 ou similar
    // Ajustar conforme a estrutura real dos arquivos
    return `/musicas/${code.toLowerCase()}/audio.mp3`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Se falhar ao tocar, pode ser que o arquivo não exista
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!hasMP3) {
    return (
      <div className="audio-player disabled">
        <button className="audio-play-btn" disabled aria-label="Áudio não disponível">
          <i className="fas fa-music"></i>
        </button>
        <span className="audio-status">Sem áudio</span>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={getAudioUrl(musicaCode)}
        preload="metadata"
        playsInline
        onError={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />
      
      <button
        className={`audio-play-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : isPlaying ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </button>

      <div className="audio-controls">
        <div className="audio-time">
          <span>{formatTime(currentTime)}</span>
          <span className="audio-duration">/ {formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="audio-progress"
          aria-label="Posição do áudio"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
