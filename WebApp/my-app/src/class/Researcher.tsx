import Member from "./Member";

import ResearcherProject from "./ResearcherProject";

export default class Researcher extends Member{
    private faculty:string 
    private major:string 
    private researcherProject:ResearcherProject[] = []

    public getResearcherProject(): ResearcherProject[] {
        return this.researcherProject;
    }

    public setResearcherProject(researcherProject: ResearcherProject[]
    ): void {
        this.researcherProject = researcherProject;
    }
    public getFaculty(): string {
        return this.faculty;
    }

    public setFaculty(faculty: string): void {
        this.faculty = faculty;
    }

    public getMajor(): string {
        return this.major;
    }

    public setMajor(major: string): void {
        this.major = major;
    }

}