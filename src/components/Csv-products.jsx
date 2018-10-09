import React from 'react';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import './styles/mycollections.css';
import CSVReader from './Csv-reader';
import CSVProductsCard from './Csv-products-card';


class CSVProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filename: ''
    }
  }

  handleUpload(data, filename) {
    console.log(data, filename);
    this.setState({products: data, filename});
  }

  handleSubmit(e) {
    // handlesubmit will just upload the files from the store
    e.preventDefault();
    const { products } = this.state;
    console.log(products);
    console.log('handledSubmit');
    products.forEach(product => {

    });
  }

  handleChange(e) {
    console.log('handleChange');
    const { products } = this.state;
    const id = e.target.name.split(' ');
    const newProducts = products.slice(0);
    newProducts[id[1]][id[0]] = e.target.value;
    if (id[0] === 'productType') {
      console.log('change subtype');
      switch(newProducts[id[1]][id[0]]) {
        case 'razor':
          newProducts[id[1]].subtype = 'Double Edge';
          break;
        case 'brush':
          newProducts[id[1]].subtype = 'Badger';
          break;
        case 'lather':
          newProducts[id[1]].subtype = 'Cream';
          break;
        default:
          newProducts[id[1]].subtype = 'none';
      }
    }
    this.setState({products: newProducts})
  }

  handleRemove(e) {
    const { products } = this.state;
    const id = e.target.name.split(' ');
    this.setState({products: products.slice(0, id[1]).concat(products.slice(id[1]+1))})
  }

  render() {
    const response = this.state.products.map((product, i) => {
      return (
      <div key={`csv-product-${i}`}>
        <CSVProductsCard 
          {...product} 
          index={i}
          handleChange={e => this.handleChange(e)}
          handleRemove={e => this.handleRemove(e)}
        />
      </div>);
    }) 
    let reader;
    if (this.state.products.length < 1) {
      reader = (
        <CSVReader
          onFileLoaded={(data, filename) => this.handleUpload(data, filename)}
        />
      )
    } else {
      reader = <h3>{`Extracted files from ${this.state.filename}`}</h3>
    }
    const submit = this.state.products.length > 0 ? <button type="submit">+ Add All</button> : null;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {reader}
        {response}
        {submit}
      </form>
    );
  }
}


export default connect()(CSVProducts);
