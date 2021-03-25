import React, { useState, useEffect } from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Styles from './popupeditcol.module.scss';
import Closeicon from '../../assets/icons/closeicon';
import Popupcontainer from '../popupcontainer';
import DragAndDrop from '../dragndrop';
import Search from '../search';
import Accordion from '../accordian';
import { getHeaderFields, ClassNames } from '../../helper';

export default function Popupeditcol({
  hidecoledit,
  show,
  selectedItems,
  options,
  handleOnApplyEditColumns,
  handleOnCancelEditColumns,
}) {
  const [items, setItems] = useState([]);
  const [selectOptions, setselectOptions] = useState([]);
  const [totalSelectableCount, settotalSelectableCount] = useState(0);

  useEffect(() => {
    let selectableCount = 0;
    options.map((element) => {
      selectableCount += element.fields.length;
      return element;
    });
    settotalSelectableCount(selectableCount);
    setItems(selectedItems);
    setselectOptions(options);
  }, [selectedItems, options, show]);

  const closepop = () => {
    hidecoledit();
  };

  const handleOnDragAndDrop = (filteredData) => {
    setItems(filteredData);
  };

  const handleOnCheckboxChange = (name, checked, parentTable) => {
    options.forEach((option) => {
      if (option.name === parentTable) {
        option.fields.forEach((field) => {
          if (field.name === name) {
            if (!checked) {
              const filteredItems = items.filter((item) => item.name !== name);
              setItems(filteredItems);
            } else {
              setItems([...items, { ...field, parentTable }]);
            }
          }
        });
      }
    });
  };

  const handleOnSearch = (searchTerm) => {
    const filteredOptions = options.map((option) => {
      const filteredFields = option.fields.filter(({ label }) => new RegExp(searchTerm, 'i').test(label));
      return {
        ...option,
        fields: filteredFields,
      };
    }).filter(({ fields }) => fields.length);
    setselectOptions(filteredOptions);
  };

  const handleOnApply = () => {
    handleOnApplyEditColumns(getHeaderFields(items), items);
  };

  const handleOnCancel = () => {
    setItems([]);
    setselectOptions(options);
    closepop();
    handleOnCancelEditColumns(getHeaderFields(selectedItems));
  };

  return (
    <>
      {show && (
        <Popupcontainer>
          <div
            aria-hidden
            className={ClassNames([Styles.popupcontainer, show && Styles.show])}
            onClick={closepop}>
            <div className={Styles.popupWrapper}>
              <div
                aria-hidden
                className={Styles.popupSect}
                onClick={(event) => event.stopPropagation()}>
                <div
                  aria-hidden
                  className={Styles.popupClose}
                  onClick={closepop}>
                  <Closeicon />
                </div>
                <div className={Styles.popContent}>
                  <div className={Styles.pophead}>
                    <h2>Columns</h2>
                  </div>
                  <div className={Styles.popinner}>
                    <div className={Styles.leftsect}>
                      <div className={Styles.search}>
                        <Search
                          border="true"
                          placeholder="Type to search..."
                          handleOnSearch={handleOnSearch}
                        />
                      </div>
                      <div className={Styles.accordian}>
                        <Accordion
                          selectedItems={items}
                          panels={selectOptions}
                          handleOnCheckboxChange={handleOnCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className={Styles.rightsect}>
                      <DragAndDrop
                        handleOnRemoveItem={handleOnDragAndDrop}
                        handleOnReorderItem={handleOnDragAndDrop}
                        data={items}
                      />
                    </div>
                  </div>
                  <div className={Styles.popfoot}>
                    <p>
                      {`${
                        (items && items.length) || 0
                      } out of ${totalSelectableCount} selected`}
                    </p>
                    <div className={Styles.buttonsect}>
                      <div>
                        <Button color="secondary" onClick={handleOnCancel}>
                          Cancel
                        </Button>
                      </div>
                      <div>
                        <Button onClick={handleOnApply}>Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popupcontainer>
      )}
    </>
  );
}

Popupeditcol.propTypes = {
  hidecoledit: PropTypes.func.isRequired,
  handleOnApplyEditColumns: PropTypes.func.isRequired,
  handleOnCancelEditColumns: PropTypes.func.isRequired,
  show: PropTypes.bool,
  selectedItems: PropTypes.array,
  options: PropTypes.array,
};

Popupeditcol.defaultProps = {
  show: false,
  selectedItems: [],
  options: [],
};
