require('normalize.css');

require('bootstrap/dist/css/bootstrap.css');

require('styles/App.scss');
var $ = require('jquery');

import React from 'react';
import SearchForm from './SearchForm';
import SongList from './SongList';
import RelatedArtists from './RelatedArtists';


class SpotifyApp extends React.Component {
        constructor(props){
          super(props)
          this.handleArtistSubmit = this.handleArtistSubmit.bind(this);
          this.getSongs = this.getSongs.bind(this);
          this.noSongs = this.noSongs.bind(this);
          this.state = {artist: 'Jason Isbell', data: [], related: [], artistList: []};

        }
        getSongs (url){
          $.ajax({
            url: url.href+'/top-tracks?country=US',
            success: function(data){
              this.setState({data: data.tracks});
            }.bind(this),
            error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
          });
        }
        noSongs (){
          this.setState({data: 'invalid', artistName: ':('});

        }

        getRelated (url){
          $.ajax({
            url: url.href+'/related-artists',
            success: function(related){
              this.setState({related: related.artists});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
        }.bind(this)
          });
        }


        componentDidMount(){
        //  this.state = {artist: 'Jason Isbell', data: []};
        //  this.handleArtistSubmit(this.state.artist);
        }
        handleArtistSubmit (artist){


          $.ajax({
              url: 'https://api.spotify.com/v1/search?q='+artist.artist+'&type=artist',
              success: function(data){

                var artistHref = data.artists.items[0];
                setTimeout(() =>{
                      this.setState({artistName: artist.artist});
                      this.setState({artistList: data});
                      artistHref ? [this.getSongs(artistHref), this.getRelated(artistHref)] : this.noSongs();
                }, 250);

              }.bind(this),
              error: function(xhr, status, err) {

            console.error(this.props.url, status, err.toString());

          }.bind(this)
           });
        }
        render () {
          return (
            <main>

            <div className="header">
            <SearchForm  className="test" onArtistSubmit={this.handleArtistSubmit} />
            </div>
            <div className="wrapper">
              <div className='list-container col-sm-10 '>
                <SongList   artistName={this.state.artistName} data={this.state.data} />
              </div>
              <div className="related-artists-container col-sm-2  ">
                <RelatedArtists related={this.state.related} onSimilarClick={this.handleArtistSubmit} />
              </div>
              </div>
            </main>
          );
        }
}

SpotifyApp.defaultProps = {
  data: []
};

export default SpotifyApp;
