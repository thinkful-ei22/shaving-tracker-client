import React from 'react';
import './styles/shave-history.css';
import {connect} from 'react-redux';

class ShaveHistory extends React.Component{

  render(){
    return(
      <div>
        Lorem ipsum have some shaaaaaves
      </div>
    );
  }

}

const mapStateToProps = state => ({

});


export default connect(mapStateToProps)(ShaveHistory);