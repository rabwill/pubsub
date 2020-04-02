import * as React from 'react';
import styles from './SubscribeToItems.module.scss';
import { ISubscribeToItemsProps } from './ISubscribeToItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import  MyService, { DataService,getItems } from '../../../services/dataService'
import { Idataservice } from '../../../services/Idataservice';
import { IUpdate } from '../../../services/IUpdate';
export interface ISubscribeToItemsState {
  items: string[];
}
export default class SubscribeToItems extends React.Component<ISubscribeToItemsProps, ISubscribeToItemsState> {
  private svc: Idataservice;
  constructor(props: ISubscribeToItemsProps, state: ISubscribeToItemsState) {  
    super(props); 
    this.svc=MyService();
    this.renderItemsSub=this.renderItemsSub.bind(this);    
    this.svc.subscribe(this.renderItemsSub)
    this.state = {       
      items: []  
    };  
   
  }  

  public componentDidMount(): void {    
    this.setState({items:this.props.items})
}
public  async renderItemsSub(data:IUpdate):Promise<void>{
  this.setState({items: data.items});
}
public componentWillUnmount(): void{
  this.svc.unsubscribe(this.renderItemsSub)
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
