import React, { Component } from 'react';

import '../assets/styles/Player.css';

class Home extends Component {
    render() {
        return (
            <div className="Player">
                <div className="Player-nav">
                    <button className="Player-prev" onClick={this.props.handlePrevClick}>
                        <span className="ion-ios-skipbackward"></span>
                    </button>
                    <button className="Player-play-pause" onClick={this.props.handleSongClick}>
                        <span className={this.props.isPlaying && this.props.currentTime !== this.props.duration ? 'ion-pause' : 'ion-play'}></span>
                    </button>
                    <button className="Player-next" onClick={this.props.handleNextClick}><span className="ion-ios-skipforward"></span></button>
                </div>
                <div className="Player-info">
                    <div className="Player-name">{this.props.name}</div>
                    <div className="Player-song">{this.props.artist}</div>
                </div>
                <div className="Player-control">
                    <div className="Player-current-time">{this.props.realTime}</div>
                    <input
                        type="range"
                        className="Player-control-bar"
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="Player-total-time">{this.props.songTime}</div>
                </div>
                <div className="Player-volume">
                    <div className="icon ion-ios-volume-high"></div>
                    <input
                        type="range"
                        orient="vertical"
                        className="Player-volumeBar"
                        value={this.props.currentVolume * 100}
                        onChange={this.props.handleVolumeChange}
                    />
                </div>
            </div >
        );
    }
}

export default Home;
