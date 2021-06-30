export default class Member {
    private username: string
    private password: string
    private typeUser: string
    private name: string
    private address: string
    private tel: string
    private email: string
    private idLine: string
    private idCard: string

    public getUsername(): string
 {
        return this.username;
    }

    public setUsername(username: string
): void {
        this.username = username;
    }

    public getPassword(): string
 {
        return this.password;
    }

    public setPassword(password: string
): void {
        this.password = password;
    }

    public getTypeUser(): string
 {
        return this.typeUser;
    }

    public setTypeUser(typeUSer: string
): void {
        this.typeUser = typeUSer;
    }

    public getName(): string
 {
        return this.name;
    }

    public setName(name: string
): void {
        this.name = name;
    }

    public getAddress(): string
 {
        return this.address;
    }

    public setAddress(address: string
): void {
        this.address = address;
    }

    public getTel(): string
 {
        return this.tel;
    }

    public setTel(tel: string
): void {
        this.tel = tel;
    }

    public getEmail(): string
 {
        return this.email;
    }

    public setEmail(email: string
): void {
        this.email = email;
    }

    public getIdLine(): string
 {
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