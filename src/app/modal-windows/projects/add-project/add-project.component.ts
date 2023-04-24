import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { ProjectsModalComponent } from '../projects-modal.component';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-project',
  template: `
    <div class="input-div">
      <p>Add new project:</p>
      <mdb-form-control>
        <input
          mdbInput
          type="text"
          id="form1"
          class="form-control"
          [(ngModel)]="projectName"
          required
        />
        <label mdbLabel class="form-label" for="form1">Project Name</label>
      </mdb-form-control>
      <button
        class="btn btn-primary"
        id="add-button"
        (click)="addProject(this.projectName)"
      >
        Add Project <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `,
  styleUrls: [
    './../../../pages/shared/shared-inputs.scss',
    './../../../pages/shared/shared-modal.scss',
    './add-project.component.scss',
  ],
})
export class AddProjectComponent {
  constructor(
    private projectsService: ProjectsService,
    private projectsModalComponent: ProjectsModalComponent
  ) {}

  @Output() refreshProjects = new EventEmitter();

  projectName: string = '';

  addProject(projectName: string) {
    if (!projectName) return;

    this.projectsService.createProject({ name: projectName });
    this.projectName = '';
    this.refreshProjects.next('');
  }
}
