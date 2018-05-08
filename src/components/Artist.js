import React, { Component } from 'react';
import songData from './../mock/songs';
import Header from './Header.js';
import Player from './Player.js';

import Bump from '../assets/img/bump.svg';
import Shape from '../assets/img/shape.svg';
import '../assets/styles/Artist.css';
import '../assets/styles/Artists.css';

class Artist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistTracks: [],
            artistInfo: [],
            songs: songData.songs,
            currentSong: songData.songs[0],
            currentSongName: '',
            isPlaying: false,
            currentTime: 0,
            duration: songData.songs[0].duration,
            currentVolume: 1,
            realTime: "00:00",
            songTime: ''
        }
        this.audioElement = document.createElement('audio');
        this.audioElement.src = songData.songs[0].audioSrc;
    }

    async componentDidMount() {
        try {
            const apiKey = "4344f2026336156c2a06ee306965fdcf";
            const artistName = this.props.match.params.name;

            const resArtistInfo = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`);
            const resArtistTracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&limit=15&&api_key=${apiKey}&format=json`);

            const artistInfo = await resArtistInfo.json();
            const artistTracks = await resArtistTracks.json();
            const mergedTracks = [artistTracks.toptracks.track, this.state.songs].reduce((a, b) => a.map((c, i) => Object.assign({}, c, b[i])));

            this.setState({
                artistTracks: mergedTracks,
                artistInfo: artistInfo.artist,
                currentSongName: mergedTracks[0].name
            });
        } catch (e) {
            console.log(e);
        }

        const songTime = this.formatTime(this.state.duration);
        this.setState({ songTime })

        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });

                const realTime = this.formatTime(this.state.currentTime);

                this.setState({ realTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    formatTime(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const getSeconds = seconds < 10 ? "0" + seconds : seconds;
        return `${minutes}:${getSeconds}`;
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.timeupdate);
    }

    play(song) {
        this.audioElement.play(song);
        this.setState({ isPlaying: true });
    }

    pause(song) {
        this.audioElement.pause(song);
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song, currentSongName: song.name });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;

        if (this.state.isPlaying && isSameSong) {
            this.pause(song);
        } else {
            if (!isSameSong) {
                this.setSong(song);
                const songTime = this.formatTime(song.duration);
                this.setState({ songTime })
            }
            this.play(song);
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.artistTracks.findIndex(song => song === this.state.currentSong);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        const newSong = this.state.artistTracks[prevIndex];
        this.setSong(newSong);
        this.play(newSong);
        const songTime = this.formatTime(newSong.duration);
        this.setState({ songTime })
    }

    handleNextClick() {
        const songs = this.state.artistTracks;
        const currentIndex = songs.findIndex(song => this.state.currentSong === song);
        const nextIndex = currentIndex !== songs.length - 1 ? currentIndex + 1 : currentIndex;
        const newSong = songs[nextIndex];
        this.setSong(newSong);
        this.play(newSong);
        const songTime = this.formatTime(newSong.duration);
        this.setState({ songTime })
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value / 100;
        this.audioElement.volume = newVolume;
        this.setState({ currentVolume: newVolume });
    }

    conditions(song) {
        return this.state.isPlaying && song === this.state.currentSong && this.state.currentTime !== this.state.duration;
    }

    render() {
        const artistTracks = this.state.artistTracks;
        const artistInfo = this.state.artistInfo;
        return (
            <div className="Artist">
                <Header></Header>
                <div className="Artist-container">
                    <div className="Artist-info">
                        <div className="Artist-wrap">
                            <img src={artistInfo.image && artistInfo.image[4]['#text']} alt="" />
                            <p className="Artist-bio">{artistInfo.bio && artistInfo.bio.content}</p>
                        </div>
                        <div className="Artist-wrap">
                            <div className="Artist-name">{artistInfo && artistInfo.name}</div>
                            <div className="Artists-listeners">Listeners &bull; {artistInfo.stats && artistInfo.stats.listeners}</div>
                            <div className="Artists-tag">Hip-Hop | Rap</div>
                            <div className="Artist-play"></div>
                            <div className="Artist-buttons">
                                <span className="Artist-share">Share
                                    <img src={Shape} alt="" />
                                </span>
                                <span className="Artist-like">
                                    <img src={Bump} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="Artist-tracks">
                        <h2>Tracklist</h2>
                        <ul className="Artist-tracklist">
                            {artistTracks.map((track, i) =>
                                <li className="Artist-track" key={i} onClick={() => this.handleSongClick(track)}>
                                    <span className="Artist-trackIndex">
                                        <span className="Artist-songNumber">{(this.conditions(track)) || (!this.state.isPlaying && track === this.state.currentSong && this.state.currentTime > 0) ? (!this.state.isPlaying ? <i className="ion-play"></i> : "") : i + 1}</span>

                                        <span className={(this.conditions(track)) ? "" : "ion-play play"}></span>

                                        <span className={(this.conditions(track)) ? "ion-pause pause" : ""}></span>
                                    </span>
                                    <span className="Artist-trackName">{track.name}</span>
                                    <span className="Artist-trackArtist">{track.artist.name}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {this.state.isPlaying ? <Player
                    name={this.state.currentSongName}
                    artist={artistInfo.name}
                    handleNextClick={() => this.handleNextClick()}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    currentVolume={this.state.currentVolume}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    realTime={this.state.realTime}
                    songTime={this.state.songTime}
                /> : ""}
            </div>
        )
    }
}

export default Artist;
