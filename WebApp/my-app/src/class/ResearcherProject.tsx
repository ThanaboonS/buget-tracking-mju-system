import Researcher from "./Researcher";

import Project from "./Project";

export default class ResearcherProject{ 
    private statusRes:string 
    private researcher:Researcher
    private project:Project

    public getStatusRes(): string {
        return this.statusRes;
    }

    public setStatusRes(statusRes: string): void {
        this.statusRes = statusRes;
    }

    public getResearcher(): Researcher
 {
        return this.researcher;
    }

    public setResearcher(researcher: Researcher
): void {
        this.researcher = researcher;
    }

    public getProject(): Project {
        return this.project;
    }

    public setProject(project: Project): void {
        this.project = project;
    }


}