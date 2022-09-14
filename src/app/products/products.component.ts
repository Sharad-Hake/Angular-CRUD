import { Component, OnInit, VERSION,ViewChild ,AfterViewInit} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = 'Angular CRUD';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','comment','date','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService ,  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
      autoFocus: false, 
      restoreFocus: false
    }).afterClosed().subscribe(val =>{
      if(val === "save"){
        this.getAllProducts();
      }
    })
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })
  }

editProduct(row : any){
  this.dialog.open(DialogComponent, {
    width: '50%',
    data:row,
    autoFocus: false, 
      restoreFocus: false
  }).afterClosed().subscribe(val =>{
    if(val === "update"){
      this.getAllProducts();
    }
  })
}

deleteProduct(id : number){
  let text = "Are you sure you want to delete this product?";
  if (confirm(text) == true){
this.api.deleteProduct(id).subscribe({
  next :(res)=>{
   alert("Product deleted successfully.");
   this.getAllProducts();
  },
  error:(err)=>{
    alert("Error while deleting the record");

  }

})
}
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}





