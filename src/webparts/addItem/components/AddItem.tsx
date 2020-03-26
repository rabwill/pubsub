import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DataService from '../../../services/dataService'
import { Idataservice } from '../../../services/Idataservice';
export interface IAddItemState {
  items: string[];
}

export default class AddItem extends React.Component<IAddItemProps,IAddItemState> { 
  public _svc:Idataservice;
  constructor(props: IAddItemProps, state: IAddItemState) {  
    super(props);  
  
    this.state = {       
      items: []  
    };  
    this.addItemsIntoStorage=this.addItemsIntoStorage.bind(this);
    this.renderItems=this.renderItems.bind(this);
    this._svc=new DataService()
    this._svc.subscribe(this.renderItems)
  }  

  public componentDidMount(): void { 
    var it=this.props.items;
    if(it){
      this.renderItems(it);
    }
    

  }
  public  renderItems(data:any):void{   
    this.setState({items:data});
  }
  public componentWillUnmount(): void{
    this._svc.unsubscribe(this.renderItems)
  }

  public addItemsIntoStorage():void{   
    this._svc.addItem(new Date().toString());   
  
    }
  

  public render(): React.ReactElement<IAddItemProps> {
 
    return (
      <div className={ styles.addItem }>
        <div className={ styles.container }>
          <div className={ styles.row }>
           
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
       
              <button onClick={this.addItemsIntoStorage} className={ styles.button }> 
                <span className={ styles.label }>Add Items</span>
              </button>
              <div>
            {this.state.items}
              </div>
         
          </div>
        </div>
      </div>
    );
  }
}
