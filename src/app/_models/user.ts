export interface IUser
{
    Id: string;
    usernameOrEmail: string;
    Token?: string;
}

export interface IUserRequest{
    usernameOrEmail: string;
    Password: string;
}

export const NoUser: IUser= {
    Id : 'noid',
    Token: 'no-token',
    usernameOrEmail: 'blank'
};

export class User implements IUser
{
    public Id: string;
    public Token?: string;
    public usernameOrEmail: string;
    public constructor(Id: string, usernameOrEmail: string, token?: string)
    {
        this.Id = Id;
        this.usernameOrEmail = usernameOrEmail;
        this.Token = token;
    }
}