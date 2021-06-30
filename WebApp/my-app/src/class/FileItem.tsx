

export default class FileItem{
    private fileName:string

    public getFileName(): string {
        return this.fileName;
    }

    public setFileName(fileName: string): void {
        this.fileName = fileName;
    }

}