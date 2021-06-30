

export default class ResearcherInProjectBean {
    private username: string
    private name: string
    private faculty: string
    private major: string
    private address: string
    private tel: string
    private email: string
    private idLine: string
    private idCard: string
    private statusInProject: string

    public getStatusInProject(): string {
        return this.statusInProject;
    }

    public setStatusInProject(statusInProject: string): void {
        this.statusInProject = statusInProject;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string
    ): void {
        this.name = name;
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

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string
    ): void {
        this.address = address;
    }

    public getTel(): string {
        return this.tel;
    }

    public setTel(tel: string
    ): void {
        this.tel = tel;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string
    ): void {
        this.email = email;
    }

    public getIdLine(): string {
        return this.idLine;
    }

    public setIdLine(idLine: string
    ): void {
        this.idLine = idLine;
    }

    public getIdCard(): string {
        return this.idCard;
    }

    public setIdCard(idCard: string): void {
        this.idCard = idCard;
    }


}