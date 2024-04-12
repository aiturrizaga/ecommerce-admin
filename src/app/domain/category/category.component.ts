import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'description', 'slug'];
  public dataSource: any[] = [];
  public categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    console.log('OnInit');
    this.getCategories();
  }

  getCategories() {
    this.categoryService.findAll().subscribe(
      (res: any) => {
        console.log(res);
        this.categories = res.content;
        this.dataSource = this.categories;
      }
    )
  }

  
}
