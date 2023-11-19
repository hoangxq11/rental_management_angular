import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientStatus } from 'src/app/commons/constants/status';
import { ClientDto } from 'src/app/commons/dto/client';
import { ClientService } from 'src/app/services/client.service';
import { ModalAdminCreateClientComponent } from '../modal/modal-admin-create-client/modal-admin-create-client.component';
import { ModalAdminUpdateClientComponent } from '../modal/modal-admin-update-client/modal-admin-update-client.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custormer-rental-room',
  templateUrl: './custormer-rental-room.component.html',
  styleUrls: ['./custormer-rental-room.component.scss']
})
export class CustomerRentalRoomComponent {

  validateForm!: UntypedFormGroup;
  rowSelectedClient: number = -1;

  constructor(
    private modalService: NzModalService,
    private fb: UntypedFormBuilder,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      startDate: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      roomDeposit: [null, [Validators.required]],
      note: [null, [Validators.required]]
    });
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

  showModalUpdateClient(clientId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin khách hàng',
      nzContent: ModalAdminUpdateClientComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.clientId = clientId;
    modal.afterClose.subscribe(() => this.getAllClient())
  }

  onDeleteClient(clientId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu khách hàng #' + clientId + '?</b>',
      nzOnOk: () => this.clientService.deleteClient(clientId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu khách hàng thành công!!'
        );
        this.getAllClient();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }

  onRental(): void {
    this.router.navigate(['/admin/clients']);
  }

  clickEvent(clientId: number): void {
    this.rowSelectedClient = clientId;
  }
}
