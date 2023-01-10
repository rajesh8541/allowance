import { Component,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-reusable',
  templateUrl: './reusable.component.html',
  styleUrls: ['./reusable.component.css']
})
export class ReusableComponent {

  title = 'Allowance';
  form!: FormGroup;
  toggle = true;
  data: Array<any> = [];
  arrayControl: any;
  
  @Output() event = new EventEmitter<any>();

 
 
  ngOnInit() {
        this.form = new FormGroup({
        allowance: new FormArray([new FormGroup({
        name: new FormControl('')})]),

    });
  }

  get allowance(): FormArray {
    return this.form.get('allowance') as FormArray;
  }

  addInput(value: any) 
  {
        this.data=[];
          this.allowance.push(new FormGroup({
          name: new FormControl('')}));
          this.allowance.value.map((ele: any) => {
          this.data.push(ele)
            })   
          this.event.emit(this.data);        
          console.log(this.data);
          
  }
  removeText(index: any) {
   
        this.allowance.removeAt(index);
   
    }
  disableMethod(index: number) 
  {
        this.toggle = !this.toggle;
        if (this.toggle) {
        this.arrayControl = this.form.get('allowance') as FormArray;
        this.arrayControl.at(index).disable()
        }
        else {
        this.arrayControl = this.form.get('allowance') as FormArray;
        this.arrayControl.at(index).enable();
        }
  }
  drop(event: CdkDragDrop<Event>) 
  {
        this.data=this.allowance.value;       
        moveItemInArray(this.data, event.previousIndex, event.currentIndex);
        this.allowance.clear();
        for (let i = 0; i < this.data.length; i++) {
        this.allowance.push(new FormGroup({
        name: new FormControl(this.data[i].name)}));
       }
  }
  

}
