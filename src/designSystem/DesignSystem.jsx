import React from 'react';

import ColorBox from './ColorBox/ColorBox';
import Icon from '@material-ui/core/Icon';
import Button from '../components/UI/Button';
import CheckBox from '../components/UI/CheckBox';
import RadioButton from '../components/UI/RadioButton'
import ToggleSwitch from '../components/UI/ToggleSwitch';
import TabNav from '../components/Navigation/TabNav';
import User from '../components/UserList/User';
import Input from '../components/UI/Input';
import Dropdown from '../components/UI/Dropdown/Dropdown';
import SearchBar from '../components/UI/SearchBar';
import EventCard from '../components/Cards/EventCards/EventCard';
import GroupCard from '../components/Cards/GroupCards/GroupCard';

import exampleUserPicture from '../noProdAssets/userExample.jpg';
import groupExample from '../noProdAssets/groupExample.jpg';

const DesignSystem = () => {
  const tabs = [
    {id : '1',
     tabTitle: "Pressed",
     tabContent: ''
    },
    {id : '2',
     tabTitle: "Active",
     tabContent: ''
    },
    {id : '3',
     inactive: true,
     tabTitle: "Inactive",
     tabContent: ''
    }
  ]

  const tabsSmall = [
    {id : '1',
     tabTitle: "Pressed",
     tabContent: ''
    },
    {id : '2',
     tabTitle: "Active",
     tabContent: '',
    }
  ]

  const options = [
    {value: '1',
     text: "Option 1"
    },
    {value: '2',
     text: "Option 2"
    },
    {value: '3',
     text: "Option 3"
    },
  ]

  // if we don't give a function to the dropdown it throws an exception
  const logSelected = (value) => {
    console.log(value);
  }

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

      <div className="design-system__icons">

        <h2>Iconography</h2>
        <div className="design-system__icon-container">
          <h3 className="design-system__icon-container-title">Icons</h3>
          <div className="design-system__icon-container-icons">
            <Icon className="md30">favorite_border</Icon>
            <Icon className="md30">favorite</Icon>
            <Icon className="md30">room</Icon>
            <Icon className="md30">search</Icon>
            <Icon className="md30">settings</Icon>
            <Icon className="md30">sports_basketball</Icon>
            <Icon className="md30">sports_golfball</Icon>
            <Icon className="md30">sports_soccer</Icon>
            <Icon className="md30">sports_tennis</Icon>
            <Icon className="md30">sports_volleyball</Icon>
            <Icon className="md30">view_headline</Icon>
            <Icon className="md30">watch_later</Icon>
            <Icon className="md30">add</Icon>
            <Icon className="md30">add_circle_outline</Icon>
            <Icon className="md30">arrow_back</Icon>
            <Icon className="md30">arrow_forward</Icon>
            <Icon className="md30">bookmark_border</Icon>
            <Icon className="md30">chevron_left</Icon>
            <Icon className="md30">dashboard</Icon>
            <Icon className="md30">delete_outline</Icon>
            <Icon className="md30">done</Icon>
            <Icon className="md30">event_note</Icon>
            <Icon className="md30">expand_less</Icon>
            <Icon className="md30">expand_more</Icon>
            <Icon className="md30">filter_list</Icon>
            <Icon className="md30">help_outline</Icon>
            <Icon className="md30">info</Icon>
            <Icon className="md30">login</Icon>
            <Icon className="md30">logout</Icon>
            <Icon className="md30">mail_outline</Icon>
            <Icon className="md30">manage_accounts</Icon>
            <Icon className="md30">menu</Icon>
            <Icon className="md30">navigate_next</Icon>
            <Icon className="md30">notifications_none</Icon>
            <Icon className="md30">question_answer</Icon>
            <Icon className="md30">report_problem</Icon>
            <Icon className="md30">person</Icon>
            <Icon className="md30">visibility</Icon>
            <Icon className="md30">face</Icon>
            <Icon className="md30">bookmark</Icon>
          </div>
        </div>

      </div>

      <div className="design-system__buttons">

        <h2>Buttons</h2>
        <div className="design-system__button-container">

          <div className="design-system__button-container-buttons">
            <h3 className="design-system__button-container-title">Active</h3>
            <Button additionalClass="button-normal">
              BUTTON
            </Button>
            <Button additionalClass="button-outlined">
              BUTTON
            </Button>
            <Button additionalClass="button-normal--iconed">
              BUTTON
              <Icon>done</Icon>
            </Button>
            <Button additionalClass="button-outlined--iconed">
              <Icon>done</Icon>
              BUTTON
            </Button>
            <Button additionalClass="icon-button icon-button--menu">
              <Icon>menu</Icon>
            </Button>
          </div>

          <div className="design-system__button-container-buttons">
            <h3 className="design-system__button-container-title">Pressed</h3>
            <Button additionalClass="normal-pressed">
              BUTTON
            </Button>
            <Button additionalClass="outlined-pressed">
              BUTTON
            </Button>
            <Button additionalClass="normal-iconed-pressed">
              BUTTON
              <Icon>done</Icon>
            </Button>
            <Button additionalClass="outlined-iconed-pressed">
              <Icon>done</Icon>
              BUTTON
            </Button>
            <Button additionalClass="icon-button-pressed">
              <Icon>menu</Icon>
            </Button>
          </div>

          <div className="design-system__button-container-buttons">
            <h3 className="design-system__button-container-title">Disabled</h3>
            <Button additionalClass="button-normal" isDisabled={true}>
              BUTTON
            </Button>
            <Button additionalClass="button-outlined" isDisabled={true}>
              BUTTON
            </Button>
            <Button additionalClass="button-normal--iconed" isDisabled={true} onClick={() => {console.log('alma');}}>
              BUTTON
              <Icon>done</Icon>
            </Button>
            <Button additionalClass="button-outlined--iconed" isDisabled={true}>
              <Icon>done</Icon>
              BUTTON
            </Button>
            <Button additionalClass="icon-button" isDisabled={true}>
              <Icon>menu</Icon>
            </Button>
          </div>

        </div>

      </div>

      <div className="design-system__controls">
        <h2>Controls</h2>
        <div className="design-system__control-container">
          <div className="design-system__control-container-checkbox">
            <h3 className="design-system__control-container-title">Checkbox</h3>
            <p className="design-system__control-container-on">On</p>
            <p className="design-system__control-container-off">Off</p>
            <p className="design-system__control-container-checked">Checked</p>
            <p className="design-system__control-container-unchecked">Unchecked</p>
            <CheckBox additionalClass="design-system__control-container-checkbox--on-checked" isChecked={true}></CheckBox>
            <CheckBox additionalClass="design-system__control-container-checkbox--on-unchecked"></CheckBox>
            <CheckBox additionalClass="design-system__control-container-checkbox--off-checked" isChecked={true} isDisabled={true}></CheckBox>
            <CheckBox additionalClass="design-system__control-container-checkbox--off-unchecked" isDisabled={true}></CheckBox>
          </div>
          
          <div className="design-system__control-container-radio-button">
            <h3 className="design-system__control-container-title">Radio button</h3>
            <p className="design-system__control-container-on">On</p>
            <p className="design-system__control-container-off">Off</p>
            <p className="design-system__control-container-checked">Checked</p>
            <p className="design-system__control-container-unchecked">Unchecked</p>
            <RadioButton additionalClass="design-system__control-container-radio-button--on-checked" isChecked={true}></RadioButton>
            <RadioButton additionalClass="design-system__control-container-radio-button--on-unchecked"></RadioButton>
            <RadioButton additionalClass="design-system__control-container-radio-button--off-checked" isChecked={true} isDisabled={true}></RadioButton>
            <RadioButton additionalClass="design-system__control-container-radio-button--off-unchecked" isDisabled={true}></RadioButton>
          </div>

          <div className="design-system__control-container-toggle-switch">
            <h3 className="design-system__control-container-title">Toggle switch</h3>
            <p className="design-system__control-container-on">On</p>
            <p className="design-system__control-container-off">Off</p>
            <p className="design-system__control-container-disabled">Disabled</p>
            <ToggleSwitch isChecked={true} additionalClass="design-system__control-container-toggle-switch--on"></ToggleSwitch>
            <ToggleSwitch isChecked={false} additionalClass="design-system__control-container-toggle-switch--off"></ToggleSwitch>
            <ToggleSwitch isDisabled={true} additionalClass="design-system__control-container-toggle-switch--disabled"></ToggleSwitch>
          </div>
        </div>

      </div>

      <div className="design-system__tab">
        <h2>Tab</h2>
        <div className="design-system__tab-container">
          <TabNav tabs={tabs}/>
          <TabNav tabs={tabsSmall}/>
        </div>
      </div>

      <div className="design-system__avatars">
        <h2>Avatars</h2>
        <div className="design-system__avatars-container">
          <div className="design-system__avatars--no-picture">
            <p>Without picture</p>
            <User profilePicture={false}>John Milton</User>
          </div>
          <div className="design-system__avatars--normal">
            <p>Normal</p>
            <User profilePicture={exampleUserPicture}>Casey Jackson</User>
          </div>
          <div className="design-system__avatars--removable">
            <p>Removable</p>
            <User profilePicture={exampleUserPicture} removable={true}>Casey Jackson</User>
          </div>
        </div>
      </div>

      <div className="design-system__input">
        <h2>Input</h2>
        <div className="design-system__input-container">
          <div>
            <p>Default</p>
            <Input 
              type="text"
              size="large"
              iconName='person'
              placeholder="Default 18x Regular"/>

            <Input 
              type="text"
              size="medium"
              iconName='person'
              placeholder="16x Regular"/>

            <Input 
              type="text"
              size="small"
              iconName='person'
              placeholder="14x Regular"/>
          </div>
          <div>
            <p>Active</p>
            <Input 
              type="text"
              size="large"
              iconName='person'
              placeholder="Active 18x Regular"
              additionalClass="focused-input"/>

            <Input 
              type="text"
              size="medium"
              iconName='person'
              placeholder="16x Regular"
              additionalClass="focused-input"/>

            <Input 
              type="text"
              size="small"
              iconName='person'
              placeholder="14x Regular"
              additionalClass="focused-input"/>
          </div>
          <div>
            <p>Error</p>
            <Input 
              type="text"
              size="large"
              iconName='person'
              placeholder="Error 18x Regular"
              invalid="error"
              validationLabel="Something's wrong"/>

            <Input 
              type="text"
              size="medium"
              iconName='person'
              placeholder="16x Regular"
              invalid="error"
              validationLabel="Something's wrong"/>

            <Input 
              type="text"
              size="small"
              iconName='person'
              placeholder="14x Regular"
              invalid="error"
              validationLabel="Something's wrong"/>
          </div>
          <div>
            <p>Warning</p>
            <Input 
              type="text"
              size="large"
              iconName='person'
              placeholder="Warning 18x Regular"
              invalid="warning"
              validationLabel="Filling required"/>

            <Input 
              type="text"
              size="medium"
              iconName='person'
              placeholder="16x Regular"
              invalid="warning"
              validationLabel="Filling required"/>

            <Input 
              type="text"
              size="small"
              iconName='person'
              placeholder="14x Regular"
              invalid="warning"
              validationLabel="Filling required"/>
          </div>
          <div>
            <p>Disabled</p>
            <Input 
              type="text"
              size="large"
              iconName='person'
              placeholder="Disabled 18x Regular"
              isDisabled={true}/>

            <Input 
              type="text"
              size="medium"
              iconName='person'
              placeholder="16x Regular"
              isDisabled={true}/>

            <Input 
              type="text"
              size="small"
              iconName='person'
              placeholder="14x Regular"
              isDisabled={true}/>
          </div>
        </div>
      </div>

      <div className="design-system__dropdown">
        <h2>Dropdown</h2>
        <div className="design-system__dropdown-container">
          <div>
            <p>Default</p>
            <Dropdown optionList={options} placeholder="Select an option" returnSelected={logSelected}/>
          </div>
          <div>
            <p>Disabled</p>
            <Dropdown optionList={options} placeholder="Select an option" disabled/>
          </div>
        </div>
      </div>

      <div className="design-system__search-bar">
        <h2>Search bar</h2>
        <div className="design-system__search-bar-container">
          <div className="design-system__search-bar--static">
            <p>Default</p>
            <SearchBar placeholder="Keresés" />
          </div>
          <div className="design-system__search-bar--static">
            <p>Disabled</p>
            <SearchBar placeholder="Keresés" disabled/>
          </div>
        </div>
      </div>

      <div className="design-system__cards">
        <h2>Cards</h2>
        <div className="design-system__cards-container">
          <div>
            <p>Simple event</p>
            <EventCard 
              title="Lábtenisz" 
              date="2021/Sep/27 15:00"
              address="Septimia Wellness központ"/>
          </div>
          <div>
            <p>Group</p>
            <GroupCard
              src={groupExample}
              title="Rugby Udvarhely"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSystem;
