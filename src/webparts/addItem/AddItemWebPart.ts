import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AddItemWebPartStrings';
import AddItem from './components/AddItem';
import { IAddItemProps } from './components/IAddItemProps';
import DataService,{getItems} from '../../services/dataService';

export interface IAddItemWebPartProps {
  description: string;
}

export default class AddItemWebPart extends BaseClientSideWebPart <IAddItemWebPartProps> {

  public _svc:DataService;
  public async onInit(): Promise<void> {
    this._svc=new DataService()
  }

  public async render(): Promise<void> {
  
    const element: React.ReactElement<IAddItemProps> = React.createElement(
      AddItem,
      {
        items: []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
