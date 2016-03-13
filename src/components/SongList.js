import React from 'react';
import ArtistName from './ArtistName';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    //    let artistTracks = 'dog';
  }
  componentDidMount(){
    this.state = {artist: '', data: []};

  }
  componentWillReceiveProps(){

  }
  clickHandler(item, e){
    e.preventDefault();
    // this.setState({clicked: true});
  }
  render () {
    let areTracks = this.props.data;
    //  this.setState({artist: artist});
    if (areTracks !== 'invalid') {
    var artistTracks = this.props.data.map(function(song) {
        return(
          <li className="col-md-6" key={song.id}>
            <figure className="song-thumbnail" style={{ backgroundImage: 'url('+song.album.images[1].url+')'}}></figure>
            <a className="song-link"  href={song.external_urls.spotify} target="_blank">
              <span className="song-name">{song.name}</span>
              <span className="song-album-name">{song.album.name}</span>
            </a>
          </li>
        );

      });
    } else {
      artistTracks = 'Hey! Try another artist, we can\'t find this one :( ';
    }

    return (
      <div>
        <ArtistName artistName={this.props.artistName}/>
        <ul className="" className="song-list">
            {artistTracks}
        </ul>

      </div>

    );
  }

}

SongList.defaultProps = {

};

export default SongList;
