import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { Project } from 'src/app/database/projects/projectModel';
import { ProjectsModalComponent } from '../projects-modal.component';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  template: `
    <div class="bg-dark">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Project</h5>
        <button type="button" class="btn" (click)="modalRef.close()">
          <i class="fa-solid fa-x exit-icon"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="input-div">
          <mdb-form-control>
            <input
              mdbInput
              type="text"
              id="form1"
              class="form-control"
              [(ngModel)]="this.name"
              required
            />
            <label mdbLabel class="form-label" for="form1">Project Name</label>
          </mdb-form-control>
          <button
            class="btn btn-primary"
            id="add-button"
            (click)="updateProject(this.name)"
          >
            Update Project <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          (click)="modalRef.close()"
        >
          Close
        </button>
      </div>
    </div>
  `,
  styleUrls: [
    './../../../pages/shared/shared-inputs.scss',
    './edit-project.component.scss',
    './../../../pages/shared/shared-modal.scss',
  ],
})
export class EditProjectComponent implements OnInit {

  constructor(
    public modalRef: MdbModalRef<EditProjectComponent>,
    private projectsService: ProjectsService,
    private projectsModalComponent: ProjectsModalComponent
  ) {}

  name: string = '';
  project!: Project;

  ngOnInit(): void {
    let project: Project | void = this.projectsService.getProject(this.name);
    if(project) {
      this.project = project;
    }
  }

  updateProject(projectName: string | null) {
    if (!projectName) {
      alert('Project name is required');
      return;
    }

    const oldName = this.project.name;
    this.project.name = this.name;
    this.projectsService.updateProject(this.project, oldName);
    this.modalRef.close();
  }
}
