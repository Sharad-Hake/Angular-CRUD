import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  id:number;
  productData :any;
  singleProduct: any;
  constructor(private _activatedRoute : ActivatedRoute, private apiService : ApiService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params :Params)=>{
      this.id=params['id'];
    })
    console.log(this.id);
    this.getAllProductsbyid();
   
  }
  getAllProductsbyid(){
    this.apiService.getProductbyid(this.id)
      .subscribe({
        next:(res)=>{
        this.singleProduct=res;
      
        },error:(err) =>{
           alert("Error While Fetching");
        },
      })
    
  }

  // getAllProducts(){
  //   this.apiService.getProduct().subscribe({
  //     next:(res)=>{
        
  //       this.productData=res;
  //       // console.log(this.productData.id);
  //       this.productData.map((i)=>{
  //         if(i.id == this.id){
  //           this.singleProduct =i;  
  //           console.log(this.singleProduct);        
  //         }
  //       })
       
       
  //     },
  //     error:(err)=>{
  //       alert("Error while fetching the records")
  //     }
  //   })
  // }

}
