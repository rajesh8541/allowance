import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'Allowance';
  form!: FormGroup;
  form1!: FormGroup;
  imageSrc = './assets/checked.png'
  imageSrc1 = './assets/checked.png'
  toggle = true;
  data: Array<any> = [];
  data1: Array<any> = [];
  arrayControl: any;

  ngOnInit() {
    this.form1 = new FormGroup({
      deduction: new FormArray([
        new FormGroup({
          name: new FormControl('')
        })
      ])
    });

    this.form = new FormGroup({
      allowance: new FormArray([
        new FormGroup({
          name: new FormControl('')
        })
      ])
    });
  }

  get deduction(): FormArray {
    return this.form1.get('deduction') as FormArray;
  }
  addDeduction() {
      this.data1 = []
      this.deduction.push(
      new FormGroup({ name: new FormControl('') })
      );
      this.deduction.value.map((e: any) => {
      this.data1.push(e)
    })
  }
  changeImageDeb() {
      this.toggle = !this.toggle;
      if (this.toggle) { this.imageSrc1 = './assets/checked.png' }
        else { this.imageSrc1 = './assets/edit.png' }
  }
  removeDeb(index: number) {
      this.deduction.removeAt(index);
  }
  disableDeb() {
      if (this.form1.disabled) { this.form1.enable(); }
      else { this.form1.disable(); }
  }

  get allowance(): FormArray {
      return this.form.get('allowance') as FormArray;
  }
  addInput() {
      this.data = []
      this.allowance.push(new FormGroup({
      name: new FormControl(''),
    })
    );
      this.allowance.value.map((ele: any) => {
      this.data.push(ele)
    })
  }
  removeText(index: any) {
      this.allowance.removeAt(index);
  }
  disableMethod(index: number) {
     this.arrayControl = this.form.get('allowance') as FormArray ;
     this.arrayControl.at(index).disable();
  }

  drop(event: CdkDragDrop<Event>) {
      moveItemInArray(this.data, event.previousIndex, event.currentIndex);
      this.allowance.clear();
      for (let i = 0; i < this.data.length; i++) {
        this.allowance.push(new FormGroup({
        name: new FormControl(this.data[i].name)
      })
      );
    }
  }

  drop1(event: CdkDragDrop<Event>) {
      moveItemInArray(this.data1, event.previousIndex, event.currentIndex);
      this.deduction.clear();
      for (let i = 0; i < this.data1.length; i++) {
        this.deduction.push(new FormGroup({
        name: new FormControl(this.data1[i].name)
      })
      );
    }
  }
}
