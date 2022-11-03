import {
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { urlConstants } from 'src/app/core/constants/urlconstants';
import { ApiService, CurrentUserService, ToastService } from 'src/app/core/service';
import * as _ from 'lodash-es';


// interface CategoryNode {
//   name?: string;
//   description?: string;
//   icon?: string;
//   subCatId?: string;
//   blog?: string;
//   children?: CategoryNode[];
//   parent?: string;
// }

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @ViewChild('categoryDialog') categoryDialog: TemplateRef<any> | undefined;
  @ViewChild('sugestionDialog') sugestionDialog: TemplateRef<any> | undefined;
  public Editor = ClassicEditor;
  ckConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        '|',
        'undo',
        'redo',
        '-',
        'numberedList',
        'bulletedList',
      ],
      shouldNotGroupWhenFull: true,
    },
  };
  sub_category: any = {};

  subCategoryIds: any;
  previousCategory: string ="";
  loadash = _;
  category: any= [];
  topicId: string = ""
  topicName: string = ""
  clickedCategory: any ;
  clickedCategoryId: any;
  loggedIn: any = false;
  public blog = '';
  dialogRef: any;
 
  fileName: string = 'Choose images to upload icon (svg, jpg, png)';
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    icon: '',
    blog: '',
  });

  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: CurrentUserService,
    private route:ActivatedRoute,
    private toastService:ToastService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) =>{    
      this.topicId = params.TopicId
      this.topicName = params.TopicName
    })
    this.previousCategory =  this.topicId;
    this.clickedCategory = this.topicName;
    this.clickedCategoryId = this.topicId;
    this.getUser()
    this.open()
    this.getSubCategory()
  }

  async getUser(){
    this.userService.getUser().then((data) =>{

      if(data){
        this.loggedIn = true;
      }
    })
  
  }

  open(node?: any) {
    if (this.categoryDialog) {
      const config = {
        width: '50%',
        data: node
      };
      this.dialogRef = this.dialog.open(this.categoryDialog, config);
      return this.dialogRef;
    }

  }

  getSubCategory() {

    const config = {
      url: urlConstants.readsubTopic + this.topicId

    }

    const configRead = {
      url: urlConstants.getTopics
    }
    this.apiService.post(configRead).subscribe(data => {
      data.result.forEach((ele: any) => {
        if (this.topicId == ele._id) {
          if(ele.suggestionId){
            const config1 = {
              url: urlConstants.readsuggestion + ele.suggestionId
            }
            this.apiService.get(config1).subscribe(data => {
              this.dataSource.data[0].blog = data.result[0].blog;
            }, error => {
            })
          }
          this.ref.detectChanges();
        }
      });

    })


    this.apiService.post(config).subscribe(data => {
      this.category[0] = {}
      this.category[0]["name"] = this.topicName
      let childrenArray: any = []
      let subCategorychildrenArray: any =[]
      data.result.forEach((ele: any) => {
        let sub_category = { "name": ele.topicName, "description": ele.description, "blog": ele.suggestion, "subCatId": ele._id, "children":subCategorychildrenArray , "topicId":ele.topicId}
       subCategorychildrenArray =[];
        childrenArray.push(sub_category)    
      });
    
      this.category[0]["children"] = childrenArray
      this.subCategoryIds = this.category[0].children
      this.dataSource.data = this.category
      this.ref.detectChanges();

    })
   
  }

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  // iconChoosen($event: any) {
  //   const file = $event.target.files[0];
  //   if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
  //     this.fileName = file.name;
  //     console.log($event);
  //   }
  // }

  openSuggestion(edit?: any) {
    if (!edit) {
      this.firstFormGroup.patchValue({
        blog: '',
      });
    }
    const config = {
      width: '80%',
    };
    if (this.sugestionDialog) {
      this.dialogRef = this.dialog.open(this.sugestionDialog, config);
      return this.dialogRef;
    }
  }

  editBlog() {
    this.firstFormGroup.patchValue({
      blog: this.dataSource.data[0].blog,
    });
    this.openSuggestion(true);
  }

 onclickSubCategory(subcat: any) {

    this.clickedCategory = subcat.name
    this.clickedCategoryId = subcat.subCatId;
    this.previousCategory = subcat.topicId;
    if(this.clickedCategory == this.topicName){
      const configRead = {
        url: urlConstants.getTopics
      }
      this.apiService.post(configRead).subscribe(data => {
        data.result.forEach((ele: any) => {
          if (this.topicId == ele._id) {
            if(ele.suggestionId){
              const config1 = {
                url: urlConstants.readsuggestion + ele.suggestionId
              }
              this.apiService.get(config1).subscribe(data => {
                this.dataSource.data[0].blog = data.result[0].blog;
                
              }, error => {
              })
            }
  
          }
        });
      })
  
    }else{

      this.dataSource.data[0].blog = subcat.blog.length && subcat.blog[0].blog;
          }



    if(this.clickedCategory != this.topicName){
 let config2 = {
          url: urlConstants.readsubTopic + this.clickedCategoryId
          
       }
      
        this.apiService.post(config2).subscribe(data => {
          if(data.result.length){
            subcat.children =[]
            data.result.forEach((ele: any) =>{
        
              var sub_categoryChildrenArray = {"name":ele.topicName, "description": ele.description, "blog": ele.suggestion, "subCatId": ele._id, "topicId":ele.topicId}     
              subcat.children.push(sub_categoryChildrenArray)   
              let childrenData =  this.dataSource.data;
          
                this.dataSource.data = [];
                this.dataSource.data = childrenData;
            })
            this.ref.detectChanges();     
          }  
          
        })
    }
    
      
    this.ref.detectChanges();
  }



  saveCategory(node?: any) {
    const config = {
      url: urlConstants.postsubTopic + this.clickedCategoryId,
      payload: {
        "topicName": this.firstFormGroup.value.name,
        "description": this.firstFormGroup.value.description,
        "topicId": this.clickedCategoryId
      }
      
    }
    this.apiService.post(config).subscribe(data => {

      const config1 = {
        "topicName": data.result[0].topicName,
        "description": data.result[0].description,
        "topicId": data.result[0].topicId,
      }
      this.dataSource.data[0].children?.push(config1)
      this.toastService.showMessage(data.message,'success');
      this.getSubCategory()
    }, error => {
    })
   
    this.ref.detectChanges();
  }


  saveSuggestion(data: any) {
    const config = {
      url: urlConstants.postsuggestion,
      payload: {
        "blog": this.firstFormGroup.value.blog,
      }

    }
    this.apiService.post(config).subscribe(data => {
      let config1
      let suggestionBlog = data.result[0].blog;

      if (this.clickedCategoryId == this.topicId) {
       
        config1 = {
          url: urlConstants.postsubTopic + this.clickedCategoryId,
          payload: {
            "topicName": this.clickedCategory,
            "suggestionId": data.result[0]._id,
          }
        }

      } else {
      
        config1 = {
          url: urlConstants.postsubTopic + this.clickedCategoryId,
          payload: {
            "topicId": this.previousCategory,
            "topicName": this.clickedCategory,
            "suggestionId": data.result[0]._id
          }

        }
      }

      this.apiService.update(config1).subscribe(data => {
        if (data.responseCode == "OK") {
          // this.dataSource.data[0].blog = suggestionBlog
          this.getSubCategory()
        }
        this.toastService.showMessage(data.message,'success');
        
      }, error => {
      })
     
      this.ref.detectChanges();
    }, error => {
    })

    

  }

}
