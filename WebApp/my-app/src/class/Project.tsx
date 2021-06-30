import ResearcherProject from "./ResearcherProject";

import Period from "./Period";

import TypeProject from "./TypeProject";
import FileProject from "./FileProject";

export default class Project {
    private idProject: number
    private nameProject: string
    private dateStartProject: string    
    private budget: number
    private durationYear: number
    private statusProject: string
    private researcherProject: ResearcherProject[] = []
    private fileProject: FileProject[] = []
    private periods= new Array<Period>()
    private typeProject: TypeProject

    public getTypeProject(): TypeProject {
        return this.typeProject;
    }

    public setTypeProject(typeProject: TypeProject): void {
        this.typeProject = typeProject;
    }

    public getResearcherProject(): ResearcherProject[] {
        return this.researcherProject;
    }

    public setResearcherProject(researcherProject: ResearcherProject[]
    ): void {
        this.researcherProject = researcherProject;
    }

    public getFileProject(): FileProject[] {
        return this.fileProject;
    }

    public setFileProject(fileProject: FileProject[]
    ): void {
        this.fileProject = fileProject;
    }

    public getPeriods(): Period[] {
        return this.periods;
    }

    public setPeriods(periods: Period[]
    ): void {
        this.periods = periods;
    }

    public getIdProject(): number {
        return this.idProject;
    }

    public setIdProject(idProject: number
    ): void {
        this.idProject = idProject;
    }

    public getNameProject(): string {
        return this.nameProject;
    }

    public setNameProject(nameProject: string
    ): void {
        this.nameProject = nameProject;
    }

    public getDateStartProject(): string {
        return this.dateStartProject;
    }

    public setDateStartProject(dateStartProject: string
    ): void {
        this.dateStartProject = dateStartProject;
    }

  

    public getBudget(): number {
        return this.budget;
    }

    public setBudget(budget: number
    ): void {
        this.budget = budget;
    }

    public getDurationYear(): number {
        return this.durationYear;
    }

    public setDurationYear(durationYear: number
    ): void {
        this.durationYear = durationYear;
    }

    public getStatusProject(): string {
        return this.statusProject;
    }

    public setStatusProject(statusProject: string): void {
        this.statusProject = statusProject;
    }


}