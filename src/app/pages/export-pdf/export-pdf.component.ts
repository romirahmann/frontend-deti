import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
})
export class ExportPdfComponent {
  filterDate!: any;
  dataUsers!: any;
  userSelected!: any;
  formFilter!: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  ngOnInit() {
    this.createForm();
    this.getDataUser();
  }
  createForm() {
    this.formFilter = this.fb.group({
      user_id: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  getDataUser() {
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.dataUsers = res.data;
    });
  }
  onSubmit() {
    const dataForm = this.formFilter.value;
    const [year, month] = dataForm.date.split('-');
    const data = {
      user_id: dataForm.user_id,
      year: parseInt(year),
      month: parseInt(month),
    };
    console.log(data);
    this.route.navigate(['/export-pdf-detail'], { queryParams: data });
  }
}
