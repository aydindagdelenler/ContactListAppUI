import {Component, OnInit} from '@angular/core';
import {Contact} from "../../models/contact.model";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  name = '';
  noResult = false;

  currentPage = 1;
  count = 0;
  itemsPerPage = 10;
  pageSizes = [10, 20, 30];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(page? : number): void {
    this.currentPage = page ?? 1;
    if (!this.name) {
      this.contactService.getAll(this.currentPage, this.itemsPerPage)
      .subscribe(
        response => {
          this.getContacts(response);
        });
    }
    else {
      this.contactService.findByName(this.name, this.currentPage, this.itemsPerPage)
      .subscribe(
        response => {
          this.getContacts(response);
        });
    }
  }

  getContacts(response: any) {
    const {contacts, totalItems} = response;
    this.contacts = contacts;
    this.count = totalItems;
    if (this.count === 0) {
      this.noResult = true;
    } else {
      this.noResult = false;
    }
  }

  handlePageChange(pageNumber: number): void {
    this.retrieveContacts(pageNumber);
  }

  handlePageSizeChange(event: any): void {
    this.itemsPerPage = event.target.value;
    this.retrieveContacts();
  }

  clear(): void {
    this.name = '';
    this.retrieveContacts();
  }
}
