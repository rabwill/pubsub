import * as React from 'react';
import styles from './SubscribeToItems.module.scss';
import { ISubscribeToItemsProps } from './ISubscribeToItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DataService from '../../../services/dataService'
import { Idataservice } from '../../../services/Idataservice';
export interface ISubscribeToItemsState {
  items: string[];
}
export default class SubscribeToItems extends React.Component<ISubscribeToItemsProps, ISubscribeToItemsState> {
  private _svc: Idataservice;
  constructor(props: ISubscribeToItemsProps, state: ISubscribeToItemsState) {  
    super(props); 
    this.state = {       
      items: []  
    };  
    this.renderItemsSub=this.renderItemsSub.bind(this);
    this._svc=new DataService()
    this._svc.subscribe(this.renderItemsSub)
  
  
  }  

  public componentDidMount(): void {  
  
    this.setState({items:this.props.items})
}
public  renderItemsSub(data:any):void{
  this.setState({items:data});
}
public componentWillUnmount(): void{
  this._svc.unsubscribe(this.renderItemsSub)
}
  public render(): React.ReactElement<ISubscribeToItemsProps> {    
   
    return (
      <div className={ styles.subscribeToItems }>
        <div className={ styles.container }>
        <div>
              {this.state.items}
              </div>
        </div>
      </div>
    );
  }
}
