import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})


export class UserService {

    constructor(public http: HttpClient){ }

    getUsersList() {
        return this.http.get(environment.BASE_URL+ 'getUserData');
    }

}