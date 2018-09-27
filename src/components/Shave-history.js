import React from 'react';
import './styles/shave-history.css';
import {connect} from 'react-redux';

import {
  getShaves
} from '../actions/shaves';

import ShaveHistoryItems from './Shave-history-items';

class ShaveHistory extends React.Component{

  componentWillMount(){
    this.props.dispatch(getShaves());
  }

  componentDidUpdate(prevProps){
    console.log('ShaveHistory isLoading:', this.props.isLoading);
  }

  render(){

    const shaveContent = this.props.isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems/>);

    return(
      <div className="shave-history">
        <h2>Shaves</h2>
        {this.props.error}
        <div className="shave-list">
          
          {shaveContent}
          
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => ({
  isLoading: state.shaveReducer.isLoading,
  error: state.shaveReducer.error
});


export default connect(mapStateToProps)(ShaveHistory);