import React from 'react';
import ColorBox from './ColorBox/ColorBox';

const DesignSystem = () => {
  return (
    <div className="design-system">

      <div className="design-system__colors">
        <h2>Color system</h2>
        <div className="design-system__color-container">
          <h3 className="design-system__color-container-title">Neutrals</h3>
          <div className="design-system__color-container-colors">
            <ColorBox className="neutral-darkest" colorCode="#262626" colorName="Neutral darkest grey" />
            <ColorBox className="neutral-darker" colorCode="#686868" colorName="Neutral darker grey" />
            <ColorBox className="neutral" colorCode="#939393" colorName="Neutral grey" />
            <ColorBox className="neutral-lighter" colorCode="#D3D3D3" colorName="Neutral lighter grey" />
            <ColorBox className="neutral-lightest" colorCode="#EDEDED" colorName="Neutral lightest grey" />
            <ColorBox className="neutral-white" colorCode="#FBFBFB" colorName="Neutral white" />
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default DesignSystem;
