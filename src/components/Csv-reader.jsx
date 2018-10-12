import React from 'react';
import PapaParse from 'papaparse';
import PropTypes from 'prop-types';

const CSVReader = ({
  cssClass = 'csv-reader-input', label, onFileLoaded, inputId = null,
}) => {
  const handleChangeFile = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      const filename = e.target.files[0].name;
      reader.onload = (event) => {
        const csvData = PapaParse.parse(event.target.result);
        const csvDataObj = {};
        csvData.data[0].forEach((property, index) => {
            if (/.*nickname.*/i.test(property)) {
              csvDataObj['nickname'] = { property, index }
            } else if (/.*producttype/i.test(property)) {
              csvDataObj['productType'] = { property, index }
            } else if (/.*brand/i.test(property)) {
              csvDataObj['brand'] = { property, index }
            } else if (/.*model/i.test(property)) {
              csvDataObj['model'] = { property, index }
            } else if (/.*comment/i.test(property)) {
              csvDataObj['comment'] = { property, index }
            } else if (/.*subtype/i.test(property)) {
              csvDataObj['subtype'] = { property, index }
            }
        })
        let products = [];
        for (let i = 1; i < csvData.data.length; i++) {
          let formattedData = {}
          for (let j=0; j < csvData.data[i].length; j++) {
            Object.keys(csvDataObj).forEach(key => {
              if (csvDataObj[key].index === j) {
                key === 'productType' ? formattedData[key] = csvData.data[i][j].toLowerCase().split(' ').join('') : formattedData[key] = csvData.data[i][j].split(' ').join('');
              }
            })
          }
          products.push(formattedData);
        }
        onFileLoaded(products, filename);
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className={cssClass}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input className="csv-input" type="file" id={inputId} accept="text/csv" onChange={e => handleChangeFile(e)} />
    </div>
  );
};

CSVReader.propTypes = {
  cssClass: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onFileLoaded: PropTypes.func.isRequired,
  inputId: PropTypes.string,
};

CSVReader.defaultProps = {
  cssClass: '',
  label: '',
  inputId: '',
};

export default CSVReader;
