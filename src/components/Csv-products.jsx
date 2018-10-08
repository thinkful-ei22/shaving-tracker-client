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
    }
  }

  handleUpload(data, filename) {
    console.log(data, filename);
    this.setState({products: data});
  }

  handleSubmit(e) {
    // handlesubmit will just upload the files from the store
    e.preventDefault();
    const { products, canSubmit } = this.state;
    console.log(products, canSubmit);
    console.log('handledSubmit');
  }

  handleChange(e) {
    console.log('handleChange');
    const { products } = this.state;
    const id = e.target.name.split(' ');
    const newProducts = products.slice(0);
    newProducts[id[1]][id[0]] = e.target.value;
    this.setState({products: newProducts})
  }

  render() {
    const response = this.state.products.map((product, i) => {
      return (
      <div key={`csv-product-${i}`}>
        <CSVProductsCard 
          {...product} 
          index={i}
          handleChange={e => this.handleChange(e)}
        />
      </div>);
    }) 
    const submit = this.state.products.length > 0 ? <button type="submit">+ Add All</button> : null;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <CSVReader
            onFileLoaded={(data, filename) => this.handleUpload(data, filename)}
          />
        {response}
        {submit}
      </form>
    );
  }
}


export default connect()(CSVProducts);
