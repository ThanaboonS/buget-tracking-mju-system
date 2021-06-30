import Member from "./Member";
import Project from "./Project";

export default class Officer extends Member {
    private position: string
    private projects: Project[] = [];

    public getPosition(): string {
        return this.position;
    }

    public setPosition(position: string): void {
        this.position = position;
    }
    public getProjects(): Project[]  {
        return this.projects;
    }

    public setProjects(projects: Project[] ): void {
        this.projects = projects;
    }

}