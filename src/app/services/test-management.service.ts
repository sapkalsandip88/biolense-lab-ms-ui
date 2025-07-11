import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TestMaster } from "../model/testMaster";
import { ParameterMaster } from "../model/parameterMaster";

@Injectable({ providedIn: 'root' })
export class TestManagementService {
   

    constructor(private http: HttpClient) {}
    url:string = "http://localhost:8080";

    getAllTests(): Observable<TestMaster[]> {  
       const callUrl= this.url+"/test-list"
        return this.http.get<TestMaster[]>(callUrl);
    }

    getTestById(testId:string): Observable<TestMaster> {
        const callUrl= this.url+"/test-details/";
        let params = new HttpParams().set('testId', testId);
        return this.http.get<TestMaster>(callUrl,{params: params})
    }

    saveTestDetails(testDetails: TestMaster): Observable<any> {
         const callUrl= this.url+"/save-details/";
        return this.http.post<any>(callUrl,testDetails)
    }

    saveParameterDetails(parameterDetails: ParameterMaster): Observable<ParameterMaster> {
        const callUrl= this.url+"/save-parameters/";
        return this.http.post<ParameterMaster>(callUrl,parameterDetails)
    }

    getParamForTest(testId: number) : Observable<ParameterMaster[]> {
        const callUrl= this.url+"/parameter-details/";
        let params = new HttpParams().set('testId', testId);
        return this.http.get<ParameterMaster[]>(callUrl,{params: params})     
    }

    getParamsDetails(testId: number, paramType: string, paramId: number) : Observable<ParameterMaster> {
        const callUrl= this.url+"/get-parameter/";
        let params = new HttpParams().set('testId', testId);
        return this.http.get<ParameterMaster>(callUrl,{params: params})  
    }
    deleteParam( paramId: number):Observable<boolean> {
        const callUrl= this.url+"/delete-parameter/";
        let params = new HttpParams().set('paramId',paramId)
        return this.http.get<boolean>(callUrl,{params: params})  
    }

    deleteTest(testId: number):Observable<boolean> {
        const callUrl= this.url+"/delete-test-details/";
        let params = new HttpParams().set('testdId',testId)
        return this.http.get<boolean>(callUrl,{params: params})   
    }
      
}