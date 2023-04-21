import { Injectable } from '@angular/core';
import { Project } from './projectModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  createEmptyProjectsItem() {
    const newProjectArray: Project[] = [];
    localStorage.setItem('projects', JSON.stringify(newProjectArray));
  }

  // Read
  getProjects(): Project[] {
    if (!localStorage.getItem('projects')) {
      this.createEmptyProjectsItem();
    }

    const projects: Project[] = JSON.parse(localStorage.getItem('projects')!);
    return projects;
  }

  getProject(projectName: string): Project | void {
    if (!localStorage.getItem('projects')) {
      this.createEmptyProjectsItem();
    }

    let project: Project | null = null;
    const projects: Project[] = JSON.parse(localStorage.getItem('projects')!);
    projects.forEach((pr: Project) => {
      if (projectName === pr.name) {
        project = pr;
        return;
      }
    });

    if (project) return project;

    alert(`Project of the name '${projectName}' not found`);
  }

  // Create
  createProject(project: Project) {
    if (this.hasDuplicates(project)) {
      return;
    }

    if (!localStorage.getItem('projects')) {
      this.createEmptyProjectsItem();
    }

    let projects: Project[] = this.getProjects();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  hasDuplicates(project: Project): boolean {
    let projects = this.getProjects();
    let duplicatesExist: boolean = false;

    projects.forEach((pr: Project) => {
      if (pr.name === project.name) {
        alert('Project names must be unique');
        duplicatesExist = true;
        return;
      }
    });

    return duplicatesExist;
  }

  // Update
  updateProject(project: Project) {
    const projects = this.getProjects();

    let index: number = -1;
    projects.forEach((pr: Project, i) => {
      if(pr.name === project.name) {
        index = i;
      }
    })
    if (index == -1) {
      return;
    }

    const updatedProjects = [...projects.slice(0,index), project, ...projects.slice(index + 1)]

    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }

  // Delete
  deleteProject(id: string) {
    const projects = this.getProjects();

    let index: number = -1;
    projects.forEach((pr: Project, i) => {
      if(pr._id === id) {
        index = i;
      }
    })
    if (index == -1) {
      return;
    }

    const updatedProjects = [...projects.slice(0,index), ...projects.slice(index + 1)]

    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  }
}
