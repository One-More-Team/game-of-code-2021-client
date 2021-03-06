import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

import styles from "./button.module.scss";

const ButtonStyle = {
  Primary: "Primary",
  Secondary: "Secondary",
  Tertiary: "Tertiary",
  Quaternary: "Quaternary",
};

const Button = ({
  label = "",
  messageId = null,
  messageValues = null,
  onClick = null,
  style = null,
  iconPrefix = "fas",
  icon = "",
  selectedIcon = null,
  isLoading = false,
  navigationTarget = null,
  className = null,
  children = null,
  isEnabled = true,
  selected = false,
}) => {
  const root = useRef();
  const container = useRef();
  const history = useHistory();

  const onClickHandler = () => {
    if (navigationTarget !== null) history.push(navigationTarget);
    if (onClick) onClick();
  };

  let styleClassName = "";
  switch (style) {
    case ButtonStyle.Primary:
      styleClassName = styles.PrimaryButton;
      break;
    case ButtonStyle.Secondary:
      styleClassName = styles.SecondaryButton;
      break;
    case ButtonStyle.Tertiary:
      styleClassName = styles.TertiaryButton;
      break;
    case ButtonStyle.Quaternary:
      styleClassName = styles.QuaternaryButton;
      break;
    default:
  }

  return (
    <div
      className={`${styleClassName} ${className} ${
        isLoading && styles.Loading
      } ${!isEnabled && styles.Disabled} ${selected ? styles.Selected : null}`}
      onClick={onClickHandler}
      ref={root}
    >
      <div ref={container}>
        {(icon || (selectedIcon && selected)) && (
          <i
            className={`${iconPrefix} ${
              selectedIcon && selected ? selectedIcon : icon
            } ${(messageId || label) && styles.Icon}`}
          ></i>
        )}
        {messageId === null ? (
          label
        ) : (
          <FormattedMessage id={messageId} values={messageValues} />
        )}
        {children}
      </div>
    </div>
  );
};

export { ButtonStyle };
export default Button;
