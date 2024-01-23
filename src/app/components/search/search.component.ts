import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor (private router :Router){}
onSearchClick(keyword: string) {
  console.log(keyword);
  this.router.navigateByUrl(`/search/${keyword}`);
}

}
