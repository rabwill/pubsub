import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SubscribeToItemsWebPartStrings';
import SubscribeToItems from './components/SubscribeToItems';
import { ISubscribeToItemsProps } from './components/ISubscribeToItemsProps';
import DataService,{getItems}from '../../services/dataService';

export interface ISubscribeToItemsWebPartProps {
  description: string;
}

export default class SubscribeToItemsWebPart extends BaseClientSideWebPart <ISubscribeToItemsWebPartProps> {
  public _svc:DataService;
  public async onInit(): Promise<void> {
    this._svc=new DataService()
  }

  public render(): void {
    const element: React.ReactElement<ISubscribeToItemsProps> = React.createElement(
      SubscribeToItems,
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
