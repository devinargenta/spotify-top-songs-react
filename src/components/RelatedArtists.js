import React from 'react';
var $ = require('jquery');

class RelatedArtists extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    //    let artistTracks = 'dog';
  }
  componentDidMount(){
    this.state = {artist: '', related: [], title: 'Related Artists'};
  }
  componentWillReceiveProps(){

  }
  handleClick(e){
    e.preventDefault();
    var artist = $(e.target).text();
    if (!artist) {
      return;
    }
    // TODO: send request up the chain to the application
    this.props.onSimilarClick({artist: artist});
    this.setState({artist: ''});

  }
  render () {
    var areSimilar = this.props.related;
    var dis = this;
    //  this.setState({artist: artist});
    if (areSimilar !== 'invalid') {
    var title =   <h4> {this.props.title}</h4>;
    var similarArtist = this.props.related.map(function(artist) {
        return(
          <li key={artist.id}>
            <a className="artist-link" href={artist.external_urls.spotify} onClick={dis.handleClick} target="_blank">
              <span className="artist-name">{artist.name}</span>
            </a>
          </li>
        );

      });
    } else {
      similarArtist = 'Hey! Try another artist, we can\'t find this one :( ';
    }

    return (
      <div>
          {title}
        <ul className="" className="related-list">
            {similarArtist}
        </ul>

      </div>

    );
  }

}

RelatedArtists.defaultProps = {
  title: 'Related Artists'
};

export default RelatedArtists;
