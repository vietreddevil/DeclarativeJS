import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

function ChecklistTable({ columns, rows, initialValues, ...otherProps }) {
  const [checkboxValues, setCheckboxValues] = React.useState(initialValues);
  
  function checkAllBoxes() {
    setCheckboxValues(new Array(rows.length).fill(true));
  }
  
  function uncheckAllBoxes() {
    setCheckboxValues(new Array(rows.length).fill(false));
  }
  
  function setCheckboxValue(rowIndex, checked) {
    const newValues = checkboxValues.slice();
    newValues[rowIndex] = checked;
    setCheckboxValues(newValues);
  }
  
  const numItems = checkboxValues.length;
  const numChecked = checkboxValues.filter(Boolean).length;
  
  return (
    <table className="pf-c-table pf-m-grid-lg" role="grid" {...otherProps}>
      <caption>
        <span>{numChecked} of {numItems} items checked</span>
        <button
          onClick={checkAllBoxes}
          disabled={numChecked === numItems}
          className="pf-c-button pf-m-primary"
          type="button"
        >
          Check all
        </button>
        <button
          onClick={uncheckAllBoxes}
          disabled={numChecked === 0}
          className="pf-c-button pf-m-secondary"
          type="button"
        >
          Uncheck all
        </button>
      </caption>
      <thead>
        <tr>
          <td />
          {columns.map(function(column) {
            return <th scope="col" key={column}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map(function(row, rowIndex) {
          const [firstCell, ...otherCells] = row;
          const labelId = `item-${rowIndex}-${firstCell}`;
          const isChecked = checkboxValues[rowIndex];
          return (
            <tr key={firstCell} className={isChecked ? 'checked' : ''}>
              <td className="pf-c-table__check">
                <input
                  type="checkbox"
                  name={firstCell}
                  aria-labelledby={labelId}
                  checked={isChecked}
                  onChange={function(event) {
                    setCheckboxValue(rowIndex, event.target.checked);
                  }}
                />
              </td>
              <th data-label={columns[0]}>
                <div id={labelId}>{firstCell}</div>
              </th>
              {otherCells.map(function(cell, cellIndex) {
                return (
                  <td key={cell} data-label={columns[1 + cellIndex]}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function ShoppingList() {
  return (
    <ChecklistTable
      aria-label="Shopping list"
      columns={['Item', 'Quantity']}
      rows={[
        ['Sugar', '1 cup'],
        ['Butter', '½ cup'],
        ['Eggs', '2'],
        ['Milk', '½ cup'],
      ]}
      initialValues={[false, false, true, false]}
    />
  );
}

ReactDOM.render(
  <ShoppingList />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
