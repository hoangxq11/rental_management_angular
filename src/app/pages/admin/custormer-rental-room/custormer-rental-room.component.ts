import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientStatus } from 'src/app/commons/constants/status';
import { ClientDto } from 'src/app/commons/dto/client';
import { ClientService } from 'src/app/services/client.service';
import { ModalAdminCreateClientComponent } from '../modal/modal-admin-create-client/modal-admin-create-client.component';

@Component({
  selector: 'app-custormer-rental-room',
  templateUrl: './custormer-rental-room.component.html',
  styleUrls: ['./custormer-rental-room.component.scss']
})
export class CustomerRentalRoomComponent {

  rowSelectedClient: number = -1;

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllClient();
  }

  listOfDisplayData: ClientDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllClient(): void {
    this.clientService.getAllClient().subscribe(response => {
      this.listOfDisplayData = response.data.filter(e => e.clientStatus.toString() == "AVAILABLE");
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  showModalCreateClient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ModalAdminCreateClientComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllClient())
  }

  onRental(): void {
    this.router.navigate(['/admin/clients']);
  }

  clickEvent(clientId: number): void {
    this.rowSelectedClient = clientId;
  }
}
