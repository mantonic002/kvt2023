import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupModel } from '../services/group-model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @Output() groupCreated: EventEmitter<void> = new EventEmitter<void>();
  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) {}

  ngOnInit() {
    this.initGroupForm();
  }

  initGroupForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const newGroup: GroupModel = new GroupModel(
        this.groupForm.value.name,
        this.groupForm.value.description
      );

      this.groupService.createGroup(newGroup).subscribe(
        (response: GroupModel) => {
          console.log('Group created:', response);

          this.groupCreated.emit();

          this.initGroupForm();
        },
        (error) => {
          console.error('Error creating group:', error);
        }
      );
    }
  }
}
