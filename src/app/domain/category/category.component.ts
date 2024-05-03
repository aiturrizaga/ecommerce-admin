import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveCategoryComponent } from './components/save-category/save-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'description', 'slug'];
  public dataSource: any[] = [];
  public categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('OnInit');
    this.getCategories();
  }

  openDialog() {
    const dlgRef = this.dialog.open(SaveCategoryComponent);
    dlgRef.afterClosed().subscribe((res) => {
      console.log('Se cerror el dialog con el valor:', res);
      if (res) {
        this.getCategories();
      }
    });
  }

  getCategories() {
    this.categoryService.findAll().subscribe((res: any) => {
      console.log(res);
      this.categories = res.content;
      this.dataSource = this.categories;
    });
  }
}
