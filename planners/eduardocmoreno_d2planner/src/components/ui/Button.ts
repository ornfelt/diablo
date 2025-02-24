import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

const Button = styled.button(({ disabled, red, blue, green, big, arrowLeft, arrowRight, noArrows }: { 
  disabled?: boolean;
  red?: boolean;
  blue?: boolean;
  green?: boolean;
  big?: boolean;
  arrowLeft?: boolean;
  arrowRight?: boolean;
  noArrows?: boolean;
}) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35em 0.7em; 
  border: 2px solid;
  border-color: var(--golden-border);
  box-shadow: inset 0 0 1em rgba(0 0 0 / 0.8);
  color: var(--color-gold);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-family-main);
  font-size: ${big ? '1.6rem' : '1.2rem'};
  font-weight: bold;
  white-space: nowrap;
  line-height: 100%;
  i[class^=icon-]{
    transform: scale(.85);
  }
  ${!noArrows && css`
    ${pseudo('before', 'after')};
    &:before,
    &:after {
      top: calc(50% - 3px);
      border-width: 3px;
      border-style: solid;
      border-color: var(--color-gold) var(--color-gold-800) transparent transparent;
    }
    
    &:before {
      right: -4px;
      transform: rotate(45deg);
    }
    
    &:after {
      left: -4px;
      transform: rotate(-45deg) scaleX(-1);
    }

    ${arrowRight && css`
      :after {
        display: none;
      }
    `}

    ${arrowLeft && css`
      :before {
        display: none;
      }
    `}
  `}
  
  ${red && !disabled && css`
    background: var(--color-red-600);
    &:hover {
      background: var(--color-red);
    }
  `}
    
  ${blue && !disabled && css`
    background: var(--color-blue-800);
    &:hover {
      background: var(--color-blue-700);
    }
  `}

  ${green && !disabled && css`
    background: var(--color-green-800);
    &:hover {
      background: var(--color-green-700);
    }
  `}

  ${disabled && css`
    background: #222;
    color: #444;
    cursor: default;
  `}
`);

export default Button;
