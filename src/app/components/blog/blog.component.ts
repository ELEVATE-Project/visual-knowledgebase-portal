import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public Editor = ClassicEditor;
  public blog = ''
  fileName:string = 'Choose images to upload icon (svg, jpg, png)'
  firstFormGroup = this._formBuilder.group({
    categoryName: ['', Validators.required],
    categoryDescription:['',Validators.required],
    subCategories:this._formBuilder.array([])
  });

  get subCategories() : FormArray {
    return this.firstFormGroup.get("subCategories") as FormArray
  }

  getSubCategories(){
    // const subCategory = this._formBuilder.group({
    //   name: new FormControl(''),
    //   blog: new FormControl('')
    // });
    this.subCategories.push(this._formBuilder.control(''))
  }
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }

  iconChoosen($event:any){
    const file = $event.target.files[0];
    if (['image/jpeg','image/png','image/svg+xml'].includes(file.type)){
      this.fileName = file.name;
      console.log($event)
    }
  }
}
