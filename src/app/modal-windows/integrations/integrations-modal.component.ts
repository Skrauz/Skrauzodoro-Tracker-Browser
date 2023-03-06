import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { getCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-integrations-modal',
  templateUrl: './integrations-modal.component.html',
  styleUrls: [
    './../../pages/shared/shared-inputs.scss',
    './../../pages/shared/shared-modal.scss',
    './integrations-modal.component.scss',
  ],
})
export class IntegrationsModalComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<IntegrationsModalComponent>) {}

  ngOnInit(): void {
    if(getCookie("TodoistAPIToken")) {
      this.todoistToken = getCookie("TodoistAPIToken");
    }
  }

  saveTokenToCookies() {
    setCookie("TodoistAPIToken", this.todoistToken);
  }

  todoistToken?: string;

  todoistApi?: TodoistApi;

  constructApi(todoistToken?: string) {
    if (todoistToken) {
      this.todoistApi = new TodoistApi(todoistToken);
    } else {
      alert('Insert your API Token');
    }
  }

  getProjects() {
    if(this.todoistApi) {
      this.todoistApi
      .getProjects()
      .then((projects) => console.log(projects))
      .catch((error) => console.log(error));
    }
  }
}
