import { Injectable } from '@angular/core';
import { Project } from './projectModel';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  // Read
  getProjects(): Project[] {
    if (localStorage.getItem('projects')) {
      const projects: Project[] = JSON.parse(localStorage.getItem('projects')!);
      return projects;
    }
    return [];
  }

  // Read One
  getProject(projectName: string): Project | void {
    if (!localStorage.getItem('projects')) {
      alert('Projects not found');
      return;
    }

    let project: Project | null = null;
    const projects: Project[] = JSON.parse(localStorage.getItem('projects')!);
    projects.forEach((pr: Project) => {
      if (projectName === pr.name) {
        project = pr;
      }
    });

    if (project) return project;

    alert(`Project of the name '${projectName}' not found`);
  }

  // Create
  createProject(project: Project) {
    if (this.hasDuplicates(project)) {
      alert('Project names must be unique');
      return;
    }
    if (localStorage.getItem('projects')) {
      let projects: Project[] = JSON.parse(localStorage.getItem('projects')!);
      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }

  hasDuplicates(project: Project): boolean {
    let duplicatesExist: boolean = false;
    if (localStorage.getItem('projects')) {
      JSON.parse(localStorage.getItem('projects')!).forEach((pr: Project) => {
        if (pr.name === project.name) {
          alert('Project names must be unique');
          duplicatesExist = true;
          return;
        }
      });
    }
    return duplicatesExist;
  }

  // Update
  updateProject(project: Project) {}

  // Delete
  deleteProject(id: string) {}
}
