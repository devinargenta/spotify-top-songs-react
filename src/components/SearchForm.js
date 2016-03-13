import React from 'react';
var $ = require('jquery');

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
     this.handleValue  = this.handleValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.blurDawgMillionaire = this.blurDawgMillionaire.bind(this);
  }
  componentDidMount (){

    this.setState({artist: ''})
  }
  blurDawgMillionaire (){
    if(this.state.artist.length < 1)
      $('.form-control').val('')
  }
   handleValue(e) {
  //   console.log(e);
    this.setState({
      artist: e.target.value
    });

   }
  handleSubmit(e){
    e.preventDefault();
    var artist = this.state.artist;
    if (!artist) {
      return;
    }
    // TODO: send request up the chain to the application
    this.props.onArtistSubmit({artist: artist});
    this.setState({artist: ''});


  }
  render () {
    return (
    <div className="search-header">
    <form className="input-group" onSubmit={this.handleSubmit} >
      <input onFocus={this.blurDawgMillionaire} type="text" onChange={this.handleValue} className="form-control" id="search-input"  placeholder="Artist Name..." />
      <span className="input-group-btn">
        <input type="submit" name="Submit" className="btn btn-default daSubmit" value="Search" />
      </span>
    </form>
  </div>
  );
  }
}

SearchForm.defaultProps = {
};

export default SearchForm;
