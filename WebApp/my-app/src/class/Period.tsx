import Item from "./Item";

export default class Period{ 
    private idPeriod:number  
    private noPeriod:number 
    private budgetPeriod:number 
    private startPeriod:string 
    private endPeriod:string 
    private items:Item[] = [] 
    private idProject:number

    public getIdProject(): number {
        return this.idProject;
    }

    public setIdProject(idProject: number): void {
        this.idProject = idProject;
    }

    public getItem(): Item[] {
        return this.items;
    }

    public setItem(items: Item[]): void {
        this.items = items;
    }
    public getIdPeriod(): number {
        return this.idPeriod;
    }

    public setIdPeriod(idPeriod: number): void {
        this.idPeriod = idPeriod;
    }

    public getNoPeriod(): number {
        return this.noPeriod;
    }

    public setNoPeriod(noPeriod: number): void {
        this.noPeriod = noPeriod;
    }

    public getBudgetPeriod(): number {
        return this.budgetPeriod;
    }

    public setBudgetPeriod(budgetPeriod: number): void {
        this.budgetPeriod = budgetPeriod;
    }

    public getStartPeriod(): string {
        return this.startPeriod;
    }

    public setStartPeriod(startPeriod: string): void {
        this.startPeriod = startPeriod;
    }

    public getEndPeriod(): string {
        return this.endPeriod;
    }

    public setEndPeriod(endPeriod: string): void {
        this.endPeriod = endPeriod;
    }

    
} 