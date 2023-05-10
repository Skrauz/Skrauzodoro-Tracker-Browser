import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { RefreshProjects } from '../actions/projects.actions';

@State<ProjectsStateModel>({
  name: 'projectsState',
  defaults: {
    refresh: false
  }
})
@Injectable()
export class ProjectsState {
  @Action(RefreshProjects)
  refreshProjects(ctx: StateContext<ProjectsStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      refresh: true
    })
  }
}

export interface ProjectsStateModel {
  refresh: boolean
}
