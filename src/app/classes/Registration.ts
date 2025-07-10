export class Registration {
    id: number|null = null;
    name: string|null = null;
    first: string|null = null;
    last: string|null = null;
    email: string|null = null;
    password: string|null = null;
    //active: boolean = false;   Is not active until user receives validation email and clicks link
    //deleted: boolean = false;  Should not see deleted records
    use_2fa: boolean = false;
    creation_time: Date = new Date();
}