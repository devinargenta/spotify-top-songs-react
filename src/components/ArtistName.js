import React from 'react';

class ArtistName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artist: ''
    };
  }
  render() {

    return (
      <h3 className="artist-title">
        {this.props.artistName}
      </h3>
    );
  }
}

ArtistName.defaultProps = {
  artistName: 'Search For Somebawdy!'
};

export default ArtistName;
