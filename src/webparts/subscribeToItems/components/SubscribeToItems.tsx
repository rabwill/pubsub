import * as React from 'react';
import styles from './SubscribeToItems.module.scss';
import { ISubscribeToItemsProps } from './ISubscribeToItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DataService, { subscribe, unsubscribe } from '../../../services/dataService'
export interface ISubscribeToItemsState {
  items: string[];
}
export default class SubscribeToItems extends React.Component<ISubscribeToItemsProps, ISubscribeToItemsState> {
  private _svc: DataService;
  constructor(props: ISubscribeToItemsProps, state: ISubscribeToItemsState) {  
    super(props); 
    this.state = {       
      items: []  
    };  
    // this.renderItemsSub=this.renderItemsSub.bind(this);
    this._svc=new DataService()
    this.renderItemsSub=this.renderItemsSub.bind(this);
    try{
    subscribe(this.renderItemsSub)
    }catch(e){
      console.log('error'+e)
    }
  }  

  public componentDidMount(): void {  
    this.setState({items:this.props.items})
}
public  renderItemsSub(data:any):void{
  this.setState({items:data});
}
public componentWillUnmount(): void{
  unsubscribe(this.renderItemsSub)
}
  public render(): React.ReactElement<ISubscribeToItemsProps> {    
    console.log(this.state.items)
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
