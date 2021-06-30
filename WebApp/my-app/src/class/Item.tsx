
import FileItem from "./FileItem";

export default class Item{ 
    private idItem:string 
    private dateBook:string 
    private titleItem:string 
    private startItem:string
    private endItem:string 
    private detail:string 
    private budgetItem:number 
    private fileItem:FileItem[] = []
    

    
    public getFileItem(): FileItem[] {
        return this.fileItem;
    }

    public setFileItem(fileItem: FileItem[]): void {
        this.fileItem = fileItem;
    }

    public getIdItem(): string {
        return this.idItem;
    }

    public setIdItem(idItem: string): void {
        this.idItem = idItem;
    }

    public getDateBook(): string {
        return this.dateBook;
    }

    public setDateBook(dateBook: string): void {
        this.dateBook = dateBook;
    }

    public getTitleItem(): string {
        return this.titleItem;
    }

    public setTitleItem(titleItem: string): void {
        this.titleItem = titleItem;
    }

    public getStartItem(): string
 {
        return this.startItem;
    }

    public setStartItem(startItem: string
): void {
        this.startItem = startItem;
    }

    public getEndItem(): string {
        return this.endItem;
    }

    public setEndItem(endItem: string): void {
        this.endItem = endItem;
    }

    public getDetail(): string {
        return this.detail;
    }

    public setDetail(detail: string): void {
        this.detail = detail;
    }

    public getBudgetItem(): number {
        return this.budgetItem;
    }

    public setBudgetItem(budgetItem: number): void {
        this.budgetItem = budgetItem;
    }

    

}