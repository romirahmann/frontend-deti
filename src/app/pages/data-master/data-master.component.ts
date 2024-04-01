import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-data-master',
  templateUrl: './data-master.component.html',
  styleUrls: ['./data-master.component.scss'],
})
export class DataMasterComponent {
  userLogin!: any;
  dataReceived: any;
  users!: any;
  displayUsers!: any;
  urlFoto: string = environment.apiUrl;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
      this.entires = this.users.length;
      this.calculateTotalPages();
      this.updateDisplayUsers();
    });
  }

  toogleModal(category_toogle: number, user: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_USER',
        funct: 'removeFoto',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-users');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_USER',
        users: user,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-users');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        users: user,
        funct: 'removeReport',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-users');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getUsers();
      const modal = document.querySelector('#modal-users');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayUsers = this.users.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayUsers();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayUsers();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
