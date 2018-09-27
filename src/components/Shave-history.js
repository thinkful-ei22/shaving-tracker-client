import React from 'react';
import './styles/shave-history.css';
import {connect} from 'react-redux';

class ShaveHistory extends React.Component{

  render(){
    return(
      <div className="shave-history">
        <h2>Shaves</h2>
        <div className="shave-list">
          <div className="shave-list-item">
            <h3>2018-09-21</h3>
            <p>Razor: Gillete Tech Travel</p>
            <p>Blade: Gillet Wilkinson</p>
            <p>Brush: Surrey 34014 Deluxe</p>
            <p>Lather: Stirling's Barbershop</p>
            <p>Aftershave: Brut Classic</p>
            <p>Add. Care: Proraso Green</p>
          </div>
          <div className="shave-list-item">
            <h3>2018-09-24</h3>
            <p>Razor: Rockwell 6S R5</p>
            <p>Blade: Gillette Silver Blue</p>
            <p>Brush: TSC Admiral Blue 24mm</p>
            <p>Lather: L'Occitane Cade Rich</p>
            <p>Aftershave: CL-Taum Sauk</p>
            <p>Add. Care: None</p>
          </div>
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => ({

});


export default connect(mapStateToProps)(ShaveHistory);