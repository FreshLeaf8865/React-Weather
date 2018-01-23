import React from "react";
import classnames from 'classnames';
import "../../stylesheets/main.scss";

type Props = {
  index: number,
  title: string,
  className: string,
  onClick: () => {},
  onClose: () => {}
}

export default class TabButton extends React.Component {
  props: Props;

  render() {
    const { index, title, className, onClick, onClose } = this.props;
    return (
      <div className={classnames('btn-group', 'tab-button', className)}>
        <button className="btn" onClick={() => onClick(index)}>
          {title}
        </button>
        <button className="btn close-btn" onClick={() => onClose(index)}>x</button>
      </div>
    );
  }
}
