import { Component, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  childInput1:any='';

  ngOnInit(){

  }

  arr:any=[]
  set = new Set()
  data:any=[]

  save(newItem: any) 
  {
        this.data.push(this.childInput1)
        console.log(this.childInput1);
        
        for(let i=0;i<this.data.length;i++){
          for(let j=0;j<this.data[i].length;j++){
            if(this.data[i][j]!=' ')
            {
              this.arr.push(this.data[i][j].name)
            }
          }     
        }
        let result=[...new Set(this.arr)]
        for( let i = 0; i < result.length; i++){                            
          if ( result[i] === '') { 
              result.splice(i, 1); 
          }
        }
        console.log(JSON.stringify(result));
  }
    
  
}
