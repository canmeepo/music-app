import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/Artist.css';

class Artists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: []
        };
    }

    async componentDidMount() {
        try {
            const apiKey = "4344f2026336156c2a06ee306965fdcf";

            const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&&api_key=${apiKey}&format=json`);
            const artists = await res.json();
            this.setState({
                artists: artists.artists.artist,
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const artists = this.state.artists;
        return (
            <div className="Artists">
                <h2>Popular artists</h2>
                <ul className="Artists-list">
                    {artists.map(artist => {
                        const name = artist.name;
                        const link = "/artist/" + name;
                        return (
                            <li className="Artists-item" key={artist.name}>
                                <Link to={link}>
                                    <div className="Artists-img">
                                        <img src={artist.image[4]['#text']} alt="Artist Page" />
                                        <div className="Artists-play"></div>
                                    </div>
                                    <div className="Artists-name">{artist.name}</div>
                                    <div className="Artists-listeners">Listeners &bull; {artist.listeners}</div>
                                    <div className="Artists-tag">Hip-Hop | Rap</div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Artists;
