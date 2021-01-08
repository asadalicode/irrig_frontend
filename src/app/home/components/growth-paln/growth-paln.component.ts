import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-growth-paln',
  templateUrl: './growth-paln.component.html',
  styleUrls: ['./growth-paln.component.scss'],
})
export class GrowthPalnComponent implements OnInit {
  @Input('recipeGrowthData') recipeGrowthData: Observable<any>;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.recipeGrowthData);
    this.recipeGrowthData.subscribe((res: any) => {
      console.log(res);
    });
  }

  edit(headers: any, element: any) {
    let data: any = {
      pumpsData: headers,
      details: element,
    };
    this.apiService.detailsSubject.next(data);

    this.router.navigate(['/component1/add-recipe/'], {
      queryParams: { data: element.id },
    });
  }

  async delete(id: number) {
    let recipeGrowthData_resp = await this.recipeGrowthData.toPromise();
    console.log(id);
    recipeGrowthData_resp.splice(id, 1);
    this.apiService.editRecipe(recipeGrowthData_resp);
    console.log(recipeGrowthData_resp);
  }


}
