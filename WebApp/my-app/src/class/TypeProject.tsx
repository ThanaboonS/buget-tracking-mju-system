import Project from "./Project";

export default class TypeProject {
    private nameTypProject: string
    private projects: Project[] = []
    public getNameTypProject(): string {
        return this.nameTypProject;
    }

    public setNameTypProject(nameTypProject: string): void {
        this.nameTypProject = nameTypProject;
    }
    public getProjects(): Project[] {
        return this.projects;
    }

    public setProjects(projects: Project[]): void {
        this.projects = projects;
    }

}