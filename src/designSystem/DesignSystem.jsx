import React from 'react';
import ColorBox from './ColorBox/ColorBox';

const DesignSystem = () => {
  return (
    <div className="design-system">

      <div className="design-system__colors">
        <h2>Color system</h2>
        <div className="design-system__color-container">
          {/* Neutral colors */}
          <h3 className="design-system__color-container-title">Neutrals</h3>
          <div className="design-system__color-container-colors">
            <ColorBox className="neutral-darkest" colorCode="#262626" colorName="Neutral darkest grey" />
            <ColorBox className="neutral-darker" colorCode="#686868" colorName="Neutral darker grey" />
            <ColorBox className="neutral" colorCode="#939393" colorName="Neutral grey" />
            <ColorBox className="neutral-lighter" colorCode="#D3D3D3" colorName="Neutral lighter grey" />
            <ColorBox className="neutral-lightest" colorCode="#EDEDED" colorName="Neutral lightest grey" />
            <ColorBox className="neutral-white" colorCode="#FBFBFB" colorName="Neutral white" />
          </div>

          {/* Primary colors */}
          <h3 className="design-system__color-container-title">Primary colors</h3>
          <div className="design-system__color-container-colors">
            <ColorBox className="primary-grey" colorCode="#344544" colorName="Primary grey" />
            <ColorBox className="primary-blue" colorCode="#36676E" colorName="Primary blue" />
            <ColorBox className="primary-green" colorCode="#C8E0B7" colorName="Primare green" />
          </div>

          {/* Secondary colors */}
          <h3 className="design-system__color-container-title">Secondary colors</h3>
          <div className="design-system__color-container-colors">
            <ColorBox className="secondary-grey" colorCode="#5A7270" colorName="Secondary grey" />
            <ColorBox className="secondary-light-grey" colorCode="#879E9D" colorName="Secondary Light Grey" />
            <ColorBox className="secondary-blue" colorCode="#55939C" colorName="Secondary Blue" />
            <ColorBox className="secondary-light-blue" colorCode="#85BFC8" colorName="Secondary Light Blue" />
            <ColorBox className="secondary-light-green" colorCode="#E2ECDB" colorName="Secondary Light Green" />
            <ColorBox className="secondary-lightest-green" colorCode="#F1FFE7" colorName="Secondary Lightest Green" />
            <ColorBox className="secondary-green" colorCode="#82E83D" colorName="Secondary Green" />
            <ColorBox className="secondary-red" colorCode="#E25858" colorName="Secondary Red" />
            <ColorBox className="secondary-yellow" colorCode="#F4CF09" colorName="Secondary Yellow" />
          </div>

          {/* Gradients */}
          <h3 className="design-system__color-container-title">Gradients</h3>
          <div className="design-system__color-container-colors">
            <ColorBox className="gradient-blue-grey" colorName="Gradient blue to grey" />
            <ColorBox className="gradient-blue-green" colorName="Gradient blue to green" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default DesignSystem;
