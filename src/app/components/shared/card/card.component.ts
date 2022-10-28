import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardDetail: any;
  @Input() last: any;
  isAdmin = localStorage.getItem('auth');
  @Output() newCategory = new EventEmitter();
  @Output() deleteOneCategory = new EventEmitter();
  @ViewChild('categoryDialog') categoryDialog: TemplateRef<any> | undefined;
  public Editor = ClassicEditor;
  public blog = '';
  dialogRef: any;
  fileName: string = 'Choose images to upload icon (svg, jpg, png)';
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    icon: '',
    blog: '',
  });
  constructor(
    public router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  redirectToBlog() {
    this.router.navigate(['/blog']);
  }

  open(node?: any) {
    console.log('node:', node);
    if (this.categoryDialog) {
      const config = {
        width: '50%',
        data: node,
      };
      this.dialogRef = this.dialog.open(this.categoryDialog, config);
      return this.dialogRef;
    }
  }

  iconChoosen($event: any) {
    const file = $event.target.files[0];
    if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      this.fileName = file.name;
    }
  }
  save() {
    this.newCategory.emit({ data: this.firstFormGroup.value });
  }
  deleteCategory() {
    this.deleteOneCategory.emit(this.cardDetail._id);
  }
}
