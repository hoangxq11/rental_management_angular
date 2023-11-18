import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalAdminCreateClientComponent } from '../modal/modal-admin-create-client/modal-admin-create-client.component';

class ClientDto {
  id!: number;
  fullName!: string;
  idCard!: string;
  address!: string;
  tel!: string;
  email!: string;
  note!: string;
  status!: string;
}

@Component({
  selector: 'app-admin-rental-contract',
  templateUrl: './admin-rental-contract.component.html',
  styleUrls: ['./admin-rental-contract.component.scss']
})
export class AdminRentalContractComponent {
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  listOfDisplayData: ClientDto[] = [
    {
      id: 1,
      fullName: "Nguyen Van A",
      idCard: "033201002717",
      address: "Mo Lao, Ha Dong, Ha Noi",
      tel: "0838978446",
      email: "anv@gmail.com",
      note: "None",
      status: "Đang thuê",
    },
    {
      id: 2,
      fullName: "Nguyen Van A",
      idCard: "033201002717",
      address: "Mo Lao, Ha Dong, Ha Noi",
      tel: "0838978446",
      email: "anv@gmail.com",
      note: "None",
      status: "Chưa thuê/Đã hủy",
    },
    {
      id: 3,
      fullName: "Nguyen Van A",
      idCard: "033201002717",
      address: "Mo Lao, Ha Dong, Ha Noi",
      tel: "0838978446",
      email: "anv@gmail.com",
      note: "None",
      status: "Chưa thuê/Đã hủy",
    },
    {
      id: 4,
      fullName: "Nguyen Van A",
      idCard: "033201002717",
      address: "Mo Lao, Ha Dong, Ha Noi",
      tel: "0838978446",
      email: "anv@gmail.com",
      note: "None",
      status: "Đang thuê",
    },
    {
      id: 5,
      fullName: "Nguyen Van A",
      idCard: "033201002717",
      address: "Mo Lao, Ha Dong, Ha Noi",
      tel: "0838978446",
      email: "anv@gmail.com",
      note: "None",
      status: "Chưa thuê/Đã hủy",
    },
  ];
  loading = false;

  showModalCreateClient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ModalAdminCreateClientComponent,
      nzWidth: 750,
    });
  }

  onProcessContract(clientId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem lịch sử thuê phòng của khách hàng này?</b>',
      nzOnOk: () => this.router.navigate(['/admin/contract', clientId])
    });
  }
}
