/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './accordian.module.scss';
import Checkbox from '../checkbox';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const node = this.myRef.current;
      const height = node.scrollHeight;
      this.setState({
        height,
      });
    }, 100);
  }

  render() {
    const {
      label,
      name,
      fields,
      activeTab,
      index,
      activateTab,
      handleOnCheckboxChange,
    } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: `${isActive ? height : 0}px`,
    };

    return (
      <div className={Styles.panel} role="tabpanel" aria-expanded={isActive}>
        <div className={Styles.panel__label} role="tab" onClick={activateTab}>
          {label}
        </div>
        <div
          className={Styles.panel__inner}
          ref={this.myRef}
          style={innerStyle}
          aria-hidden={!isActive}>
          <div className={Styles.panel__content}>
            {fields.map((field) => (
              <div className={Styles.checkboxcontainer}>
                <Checkbox
                  value={field.isChecked}
                  name={field.name}
                  label={field.label}
                  parentTable={name || field.parentTable}
                  handleOnChange={handleOnCheckboxChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default function Accordion({
  panels,
  selectedItems,
  handleOnCheckboxChange,
}) {
  const [activeTab, setactiveTab] = useState(0);
  const [panelData, setpanelData] = useState([]);

  /** */
  const filterCheckbox = () => {
    let updatedPanels = panels;
    let filterSelectedItems = selectedItems;
    if (filterSelectedItems?.length) {
      updatedPanels = panels.map((panel) => {
        panel.fields.map((field) => {
          let returnField = false;
          filterSelectedItems = filterSelectedItems.filter((item) => {
            if (!returnField) {
              field.isChecked = false;
              if (item.parentTable === panel.name && item.name === field.name) {
                returnField = true;
                field.isChecked = true;
                return false;
              }
            }
            return true;
          });
          return field;
        });
        return panel;
      });
    } else {
      updatedPanels = panels.map((panel) => {
        panel.fields.map((field) => {
          field.isChecked = false;
          return field;
        });
        return panel;
      });
    }
    setpanelData(updatedPanels);
  };

  useEffect(() => {
    filterCheckbox();
  }, [selectedItems, panels]);

  const activateTab = (index) => {
    setactiveTab((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={Styles.accordion} role="tablist">
      {panelData.map((panel, index) => (
        <Panel
          key={`${panel.name}`}
          activeTab={activeTab}
          index={index}
          {...panel}
          handleOnCheckboxChange={handleOnCheckboxChange}
          activateTab={() => activateTab(index)}
        />
      ))}
    </div>
  );
}

Accordion.propTypes = {
  handleOnCheckboxChange: PropTypes.func.isRequired,
  panels: PropTypes.array,
  selectedItems: PropTypes.array,
};
Accordion.defaultProps = {
  panels: [],
  selectedItems: [],
};

Panel.propTypes = {
  handleOnCheckboxChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  fields: PropTypes.array,
  activeTab: PropTypes.number,
  index: PropTypes.number,
  activateTab: PropTypes.func.isRequired,
};

Panel.defaultProps = {
  label: '',
  name: '',
  fields: [],
  activeTab: 0,
  index: 0,
};
