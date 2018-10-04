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
        console.log(csvData.data[0]);

        onFileLoaded(csvData.data, filename);
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
