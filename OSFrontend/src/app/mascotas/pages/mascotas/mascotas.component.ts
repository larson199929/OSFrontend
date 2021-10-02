import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../model/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit, AfterViewInit {

  mascotaData: Mascota;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'tipo', 'actions'];

  @ViewChild('mascotaForm', { static: false })
  mascotaForm! : NgForm;

  @ViewChild( MatPaginator, { static : true })
  paginator!: MatPaginator;

  @ViewChild( MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private mascotaService: MascotasService) { 
    this.mascotaData= {} as Mascota;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllMascota();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllMascota() {
    this.mascotaService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    });
  }

  editItem(element: Mascota){
    this.mascotaData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode = false;
    this.mascotaForm.resetForm();
  }

  addMascota(){
    this.mascotaData.id = 0;
    this.mascotaService.create(this.mascotaData).subscribe((response: any) =>{
      this.dataSource.data.push({...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => {return o;});
    });
  }

  updateMascota(){
    this.mascotaService.update(this.mascotaData.id, this.mascotaData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: Mascota)=>{
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  deleteItem(id: number){
    this.mascotaService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o: Mascota)=>{
        return o.id!==id ? o: false;
      });
    });
    console.log(this.dataSource.data);
  }

  onSubmit(){
    if(this.mascotaForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('about to update')
        this.updateMascota();
      } else{
        console.log('about to add');
        this.addMascota();
      }
      this.cancelEdit();
    } else{
      console.log('Invalid data');
    }
    
  }

}
