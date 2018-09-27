import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ShaveHistoryItems extends React.Component {
  render() {
    // const dummyExample = [
    //   <div className="shave-list-item">
    //     <h3>2018-09-21</h3>
    //     <p>Razor: Gillete Tech Travel</p>
    //     <p>Blade: Gillet Wilkinson</p>
    //     <p>Brush: Surrey 34014 Deluxe</p>
    //     <p>Lather: Stirling's Barbershop</p>
    //     <p>Aftershave: Brut Classic</p>
    //     <p>Add. Care: Proraso Green</p>
    //   </div>,
    //   <div className="shave-list-item">
    //     <h3>2018-09-24</h3>
    //     <p>Razor: Rockwell 6S R5</p>
    //     <p>Blade: Gillette Silver Blue</p>
    //     <p>Brush: TSC Admiral Blue 24mm</p>
    //     <p>Lather: L'Occitane Cade Rich</p>
    //     <p>Aftershave: CL-Taum Sauk</p>
    //     <p>Add. Care: None</p>
    //   </div>,
    // ];

    const { shaveHistory } = this.props;


    if (!shaveHistory) {
      return <div>No history!</div>;
    }

    const items = [];
    for (let i = 0; i < shaveHistory.length; i++) {
      const itemDate = new Date(shaveHistory[i].date)
        .toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
        });
      const keys = Object.keys(shaveHistory[i]);
      const nicknames = {};
      keys.forEach((key) => {
        nicknames[key] = shaveHistory[i][key]
          ? shaveHistory[i][key].nickname
          : 'None';
      });

      items.push(
        <div className="shave-list-item" key={`shave-list-item-${i}`}>
          <h3>{itemDate}</h3>
          <p>Rating: {shaveHistory[i].rating}</p>
          <p>Razor: {nicknames.razor}</p>
          <p>Blade: {nicknames.blade}</p>
          <p>Brush: {nicknames.brush}</p>
          <p>Lather: {nicknames.lather}</p>
          <p>Aftershave: {nicknames.aftershave}</p>
          <p>Add. Care: {nicknames.additionalCare}</p>
        </div>,
      );
    }

    return (
      items
    );
  }
}

ShaveHistoryItems.propTypes = {
  shaveHistory: PropTypes.arrayOf(Object),
};

ShaveHistoryItems.defaultProps = {
  shaveHistory: [],
};

const mapStateToProps = state => ({
  shaveHistory: state.shaves.shaveHistory,
  everything: state,
});


export default connect(mapStateToProps)(ShaveHistoryItems);
