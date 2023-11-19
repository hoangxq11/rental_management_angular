import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientDto } from 'src/app/commons/dto/client';
import { ContractDto } from 'src/app/commons/dto/contract';
import { ClientService } from 'src/app/services/client.service';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-admin-rental-contract',
  templateUrl: './admin-rental-contract.component.html',
  styleUrls: ['./admin-rental-contract.component.scss']
})
export class AdminRentalContractComponent {

  clientId!: number;
  clientDto: ClientDto = new ClientDto();

  constructor(
    private modalService: NzModalService,
    private contractService: ContractService,
    private clientService: ClientService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.clientId = Number(url[url.length - 1]);

    this.getClientById();
    this.getContractOfClient();
  }

  listOfDisplayData: ContractDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getClientById(): void {
    this.clientService.getClientById(this.clientId).subscribe(response => {
      this.clientDto = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  getContractOfClient(): void {
    this.contractService.getContractOfClient(this.clientId).subscribe(response => {
      this.listOfDisplayData = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }
}
