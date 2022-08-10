import {Project, projectState, ProjectStatus} from "./app";
import {Component} from "./component";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                if (this.type === 'active') return project.status === ProjectStatus.Active;
                if (this.type === 'finished') return project.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLDListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}